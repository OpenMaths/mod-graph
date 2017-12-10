import { GraphEvent } from "@openmaths/graph-events"

import { BaseNode } from "../types"

class Leaf implements BaseNode {
  createdAt: string
  index: number
  modifiedAt: string
  nodeId: string
  parentId: string

  constructor(event: GraphEvent) {
    const { createdAt, nodeId, parentId } = event

    this.createdAt = createdAt.toISOString()
    this.index = 0
    this.nodeId = nodeId
    this.parentId = parentId

    this.touch()
  }

  touch(): Leaf {
    this.modifiedAt = new Date().toISOString()
    return this
  }
}

export default Leaf
