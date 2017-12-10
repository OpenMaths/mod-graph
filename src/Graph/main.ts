import {
  GraphEvent,
  ActionType,
  CreateGraphEvent,
  CreateContentHolderEvent,
} from "@openmaths/graph-events"
import { match, _def } from "@openmaths/utils"

import Graph from "./Graph"
import Container from "./Container"
import Row from "./Row"
import Column from "./Column"
import ContentHolder from "./ContentHolder"

class Processor {
  nodes: { [k: string]: any }
  graph: Graph

  constructor(event: CreateGraphEvent) {
    this.nodes = []
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
        const contentHolder = new ContentHolder(event as CreateContentHolderEvent)
        const { parentId } = contentHolder
        const parent = this.nodes[parentId] as Column
        parent.insertChild(contentHolder)
        this.nodes[contentHolder.nodeId] = contentHolder
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
    return this;
  }
}

export default Processor
