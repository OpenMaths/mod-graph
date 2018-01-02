import {
  GraphEvent,
  ActionType,
  CreateGraphEvent,
  CreateContentHolderEvent,
  RemoveColumnEvent,
} from "@openmaths/graph-events"
import { isPresent, match, _def } from "@openmaths/utils"

import Graph from "./Graph"
import Container from "./Container"
import Row from "./Row"
import Column from "./Column"
import ContentHolder from "./ContentHolder"

import { ErrorMessage } from "../Constants"

class Processor {
  nodes: { [k: string]: Graph | Container | Row | Column | ContentHolder }
  graph: Graph

  constructor(event: CreateGraphEvent) {
    this.nodes = {}
    this.graph = new Graph(event)
    this.nodes[this.graph.nodeId] = this.graph
  }

  applyEvent = (event: GraphEvent): Processor => {
    match(event.actionType)({
      [ActionType.CreateGraph]: () => {
        const graph = new Graph(event)
        this.nodes[graph.nodeId] = graph
      },
      [ActionType.CreateContainer]: () => {
        const container = new Container(event)
        const { parentId } = event
        const parent = this.nodes[parentId] as Graph | Column
        // @TODO this "as any" is a hack due to some odd compile error
        ;(parent as any).insertChild(container)
        this.nodes[container.nodeId] = container
      },
      [ActionType.CreateRow]: () => {
        const row = new Row(event)
        const { parentId } = row
        const container = this.getContainer(parentId)
        container.insertChild(row)
        this.nodes[row.nodeId] = row
      },
      [ActionType.CreateColumn]: () => {
        const column = new Column(event)
        const { parentId } = column
        const row = this.getRow(parentId)
        row.insertChild(column)
        this.nodes[column.nodeId] = column
      },
      [ActionType.CreateContentHolder]: () => {
        const contentHolder = new ContentHolder(event as CreateContentHolderEvent)
        const { parentId } = contentHolder
        const column = this.getColumn(parentId)
        column.insertChild(contentHolder)
        this.nodes[contentHolder.nodeId] = contentHolder
      },
      [ActionType.RemoveColumn]: () => {
        const { graphId, nodeId } = event

        const column = this.getColumn(nodeId)
        const parentRow = this.getParentRow(nodeId)
        const parentContainer = this.getParentContainer(nodeId)

        if (column.child instanceof ContentHolder) {
          const contentHolderNodeId = column.child.nodeId
          column.removeChild()
          this.removeNode(contentHolderNodeId)
        }

        parentRow.removeChild(nodeId)
        this.removeNode(nodeId)

        if (parentRow.children.length === 0) {
          parentContainer.removeChild(parentRow.nodeId)
          this.removeNode(parentRow.nodeId)
        }

        if (parentContainer.children.length === 0) {
          const containerParent = this.getContainerParent(parentContainer.nodeId)
          containerParent.removeChild()
          this.removeNode(parentContainer.nodeId)

          if (containerParent instanceof Column) {
            const repeat = new RemoveColumnEvent(
              graphId,
              containerParent.parentId,
              containerParent.nodeId,
            )
            this.applyEvent(repeat)
          }
        }
      },
      [ActionType.RemoveContentHolder]: () => {
        const { nodeId, parentId } = event
        const parent = this.getColumn(parentId)
        parent.removeChild()
        this.removeNode(nodeId)
      },
      [_def]: (type: ActionType) => {
        throw new Error(ErrorMessage.UnknownActionType(type))
      },
    })

    this.graph.touch()

    return this
  }

  applyEvents = (events: GraphEvent[]) => {
    events.forEach(this.applyEvent)
    return this
  }

  removeNode = (nodeId: string) => {
    if (isPresent(this.nodes[nodeId])) {
      delete this.nodes[nodeId]
    } else {
      // @TODO possibly only console warning
      throw new ReferenceError(ErrorMessage.FailedDeleteAttempt(nodeId))
    }

    return this
  }

  getColumn = (columnNodeId: string): Column => {
    const column = this.nodes[columnNodeId]
    if (column instanceof Column) {
      return column
    } else {
      throw new ReferenceError(ErrorMessage.ColumnNotFound(columnNodeId))
    }
  }

  getRow = (rowNodeId: string): Row => {
    const row = this.nodes[rowNodeId]
    if (row instanceof Row) {
      return row
    } else {
      throw new ReferenceError(ErrorMessage.RowNotFound(rowNodeId))
    }
  }

  getContainer = (containerNodeId: string): Container => {
    const container = this.nodes[containerNodeId]
    if (container instanceof Container) {
      return container
    } else {
      throw new ReferenceError(ErrorMessage.ContainerNotFound(containerNodeId))
    }
  }

  getGraph = (graphNodeId: string): Graph => {
    const graph = this.nodes[graphNodeId]
    if (graph instanceof Graph) {
      return graph
    } else {
      throw new ReferenceError(ErrorMessage.GraphNotFound(graphNodeId))
    }
  }

  getParentRow = (columnNodeId: string): Row => {
    const column = this.nodes[columnNodeId]
    if (column instanceof Column) {
      const { parentId: rowNodeId } = column
      const row = this.nodes[rowNodeId]
      if (row instanceof Row) {
        return row
      } else {
        throw new ReferenceError(ErrorMessage.RowNotFound(rowNodeId))
      }
    } else {
      throw new ReferenceError(ErrorMessage.ColumnNotFound(columnNodeId))
    }
  }

  getParentContainer = (columnNodeId: string): Container => {
    const column = this.nodes[columnNodeId]
    if (column instanceof Column) {
      const { parentId: rowNodeId } = column
      const row = this.nodes[rowNodeId]
      if (row instanceof Row) {
        const { parentId: containerNodeId } = row
        const container = this.nodes[containerNodeId]
        if (container instanceof Container) {
          return container
        } else {
          throw new ReferenceError(ErrorMessage.ContainerNotFound(containerNodeId))
        }
      } else {
        throw new ReferenceError(ErrorMessage.RowNotFound(rowNodeId))
      }
    } else {
      throw new ReferenceError(ErrorMessage.ColumnNotFound(columnNodeId))
    }
  }

  getContainerParent = (containerNodeId: string): Column | Graph => {
    const { parentId } = this.getContainer(containerNodeId)
    const parent = this.nodes[parentId]
    if (parent instanceof Column || parent instanceof Graph) {
      return parent as Column | Graph
    } else {
      throw new ReferenceError(ErrorMessage.ColumnOrGraphNotFound(parentId))
    }
  }
}

export default Processor
