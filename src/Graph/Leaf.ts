import { GraphEvent } from "@openmaths/graph-events"

import { BaseNode } from "../types"

class Leaf implements BaseNode {
  createdAt: Date
  index: number
  modifiedAt: Date
  nodeId: string
  parentId: string

  constructor(event: GraphEvent) {
    const { createdAt, nodeId, parentId } = event

    this.createdAt = createdAt
    this.index = 0
    this.nodeId = nodeId
    this.parentId = parentId

    this.touch()
  }

  touch(): Leaf {
    this.modifiedAt = new Date()
    return this
  }
}

export default Leaf
