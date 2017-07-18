import { CreateColumnEvent } from '@openmaths/graph-events'

import * as I from '../interface'

export type Child = any // @TODO to become Container | ContentHolder

export default class Column<T = Child> implements I.NodeSingle<T> {
  readonly nodeId: string
  readonly parentId: string
  readonly index: number
  child: T | null

  constructor(event: CreateColumnEvent) {
    const { nodeId, parentId, insertIndex } = event

    this.nodeId = nodeId
    this.parentId = parentId
    this.index = insertIndex.unwrap_or(0)
    this.child = null
  }

  insertChild(child: T) {
    if (this.child == null) {
      this.child = child
      return this
    } else {
      throw new ReferenceError(`Cannot re-insert child in ${this.nodeId}`)
    }
  }

  removeChild() {
    this.child = null
    return this
  }
}
