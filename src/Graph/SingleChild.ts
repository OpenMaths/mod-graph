import { GraphEvent } from '@openmaths/graph-events'
import { throwIfPresent } from '@openmaths/utils'

import { ErrorMessage } from '../Constants'
import { BaseNode } from '../types'

class SingleChild<T extends BaseNode> implements BaseNode {
  child: T | null
  createdAt: Date
  index: number
  modifiedAt: Date
  nodeId: string
  parentId: string

  constructor(event: GraphEvent) {
    const { createdAt, insertIndex, nodeId, parentId } = event

    this.child = null
    this.createdAt = createdAt
    this.index = insertIndex
    this.nodeId = nodeId
    this.parentId = parentId

    this.touch()
  }

  touch(): SingleChild<T> {
    this.modifiedAt = new Date()
    return this
  }

  insertChild(child: T): SingleChild<T> {
    throwIfPresent(this.child, ErrorMessage.CannotInsertChild(child.nodeId))

    this.child = child
    return this
  }

  removeChild(): SingleChild<T> {
    this.child = null
    return this
  }
}

export default SingleChild
