import { GraphEvent } from "@openmaths/graph-events"
import { throwIfPresent } from "@openmaths/utils"

import { ErrorMessage } from "../Constants"
import { BaseNode } from "../types"

class SingleChild<T extends BaseNode> implements BaseNode {
  child: T | null
  createdAt: string
  index: number
  modifiedAt: string
  nodeId: string
  parentId: string

  constructor(event: GraphEvent) {
    const { createdAt, insertIndex, nodeId, parentId } = event

    this.child = null
    this.createdAt = createdAt.toISOString()
    this.index = insertIndex
    this.nodeId = nodeId
    this.parentId = parentId

    this.touch()
  }

  touch(): SingleChild<T> {
    this.modifiedAt = new Date().toISOString()
    return this
  }

  insertChild(child: T): SingleChild<T> {
    throwIfPresent(this.child, ErrorMessage.CannotInsertChild(child.nodeId))

    this.child = child
    return this.touch()
  }

  removeChild(): SingleChild<T> {
    this.child = null
    return this.touch()
  }
}

export default SingleChild
