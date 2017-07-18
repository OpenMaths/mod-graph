import { CreateColumnEvent } from '@openmaths/graph-events'

import * as I from '../interface'

export type Child = any // Container|ContentHolder

export default class Column<T = Child> implements I.NodeSingle<T> {
  readonly nodeId: string
  readonly parentId: string
  child: T | null

  constructor(event: CreateColumnEvent) {
    this.nodeId = event.nodeId
    this.parentId = event.parentId
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
