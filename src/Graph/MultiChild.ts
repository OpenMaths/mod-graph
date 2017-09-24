import { GraphEvent } from '@openmaths/graph-events'

import { ErrorMessage } from '../Constants'
import { BaseNode } from '../types'

// @TODO import from generic utils
const throwIfPresent = (...args: any[]) => false
const throwIfFalse = (...args: any[]) => false
const throwIfNegativeInteger = (...args: any[]) => false

class MultiChild<T extends BaseNode> implements BaseNode {
  children: T[]
  createdAt: Date
  index: number
  modifiedAt: Date
  nodeId: string
  parentId: string

  constructor(event: GraphEvent) {
    const { createdAt, insertIndex, nodeId, parentId } = event

    this.children = []
    this.createdAt = createdAt
    this.index = insertIndex
    this.nodeId = nodeId
    this.parentId = parentId

    this.touch()
  }

  touch(): MultiChild<T> {
    this.modifiedAt = new Date()
    return this
  }

  getChildByNodeId(nodeId: string): T | undefined {
    return this.children.find(child => child.nodeId === nodeId);
  }

  getChildIndexByNodeId(nodeId: string): number {
    const index = this.children.findIndex(child => child.nodeId === nodeId)

    throwIfNegativeInteger(index, ErrorMessage.NodeIdNotFound(nodeId))

    return index
  }

  isInsertIndexValid(index: number): boolean {
    return index <= this.children.length
  }

  insertChild(child: T): MultiChild<T> {
    const { nodeId, index: insertIndex } = child

    const existingChild = this.getChildByNodeId(nodeId)
    const isInsertIndexValid = this.isInsertIndexValid(insertIndex)

    throwIfPresent(existingChild, ErrorMessage.DuplicateNodeId(nodeId))
    throwIfFalse(
      isInsertIndexValid,
      ErrorMessage.InvalidInsertIndex(insertIndex),
    )

    this.children.splice(insertIndex, 0, child)
    return this
  }

  removeChild(nodeId: string): MultiChild<T> {
    const index = this.getChildIndexByNodeId(nodeId)
    this.children.splice(index, 1)
    return this
  }
}

export default MultiChild
