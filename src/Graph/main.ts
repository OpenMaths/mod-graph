import {
  GraphEvent,
  ActionType,
  CreateGraphEvent,
  CreateContentHolderEvent,
  RemoveColumnEvent,
} from "@openmaths/graph-events"
import { match, _def } from "@openmaths/utils"

import Graph from "./Graph"
import Container from "./Container"
import Row from "./Row"
import Column from "./Column"
import ContentHolder from "./ContentHolder"

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
        const { parentId } = container
        const parent = this.nodes[parentId] as Graph
        parent.insertChild(container)
        this.nodes[container.nodeId] = container
      },
      [ActionType.CreateRow]: () => {
        const row = new Row(event)
        const { parentId } = row
        const parent = this.nodes[parentId] as Container
        parent.insertChild(row)
        this.nodes[row.nodeId] = row
      },
      [ActionType.CreateColumn]: () => {
        const column = new Column(event)
        const { parentId } = column
        const parent = this.nodes[parentId] as Row
        parent.insertChild(column)
        this.nodes[column.nodeId] = column
      },
      [ActionType.CreateContentHolder]: () => {
        const contentHolder = new ContentHolder(
          event as CreateContentHolderEvent,
        )
        const { parentId } = contentHolder
        const parent = this.nodes[parentId] as Column
        parent.insertChild(contentHolder)
        this.nodes[contentHolder.nodeId] = contentHolder
      },
      [ActionType.RemoveColumn]: () => {
        const { graphId, nodeId } = event
        const parentRow = this.getParentRow(nodeId)
        const parentContainer = this.getParentContainer(nodeId)

        parentRow.removeChild(nodeId)
        delete this.nodes[nodeId]

        if (parentRow.children.length === 0) {
          parentContainer.removeChild(parentRow.nodeId)
          delete this.nodes[parentRow.nodeId]
        }

        if (parentContainer.children.length === 0) {
          const containerParent = this.nodes[parentContainer.parentId] as
            | Column
            | Graph
          containerParent.removeChild()
          delete this.nodes[parentContainer.nodeId]

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
      [_def]: (type: ActionType) => {
        throw new Error(`Error! Unknown type "${type}"`)
      },
    })

    this.graph.touch()

    return this
  }

  applyEvents = (events: GraphEvent[]) => {
    events.forEach(this.applyEvent)
    return this
  }

  getParentRow = (columnNodeId: string): Row => {
    const column = this.nodes[columnNodeId]
    if (column instanceof Column) {
      const { parentId: rowNodeId } = column
      const row = this.nodes[rowNodeId]
      if (row instanceof Row) {
        return row
      } else {
        throw new ReferenceError(`Row "${rowNodeId}" not found`)
      }
    } else {
      throw new ReferenceError(`Column "${columnNodeId}" not found`)
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
          throw new ReferenceError(`Container "${containerNodeId}" not found`)
        }
      } else {
        throw new ReferenceError(`Row "${rowNodeId}" not found`)
      }
    } else {
      throw new ReferenceError(`Column "${columnNodeId}" not found`)
    }
  }
}

export default Processor
