import { CreateRowEvent } from '@openmaths/graph-events'

import Column from '../Column'
import * as I from '../interface'

class Row implements I.Node<Column> {
  readonly nodeId: string
  readonly parentId: string
  readonly index: number
  children: Column[]

  constructor(event: CreateRowEvent) {
    const { nodeId, parentId, insertIndex } = event

    this.nodeId = nodeId
    this.parentId = parentId
    this.index = insertIndex.unwrap_or(0)
    this.children = []
  }

  insertChild(node: Column) {
    const { nodeId, index } = node

    const isNodeIdUnique = this.children.find(_ => _.nodeId === nodeId) == null
    const isInsertIndexValid = index <= this.children.length

    if (isNodeIdUnique) {
      if (isInsertIndexValid) {
        this.children.splice(index, 0, node)
        return this
      } else {
        // @TODO more informative message
        // @TODO for all error messages and logs, put it into a constants folder and snap test
        throw new RangeError(
          `Cannot add node at index greater than current number of children in ${this
            .nodeId}`,
        )
      }
    } else {
      // @TODO think of a meaningful message
      throw new ReferenceError()
    }
  }

  removeChild(nodeId: string) {
    //     let index = R.findIndex((child:Column) => R.equals(child.nodeId, nodeId), this.children);
    //
    //     if (!R.equals(index, -1))
    //         this.children.splice(index, 1);
    //     else
    //         throw new ReferenceError(`Column ${nodeId} not found in ${this.nodeId}'s children`);
    return this
  }
}

export default Row
