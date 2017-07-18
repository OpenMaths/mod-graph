import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { is_none } from '@threestup/monads'

import * as I from '../interface'

class ContentHolder implements I.Node {
  readonly nodeId: string
  children: never[]
  rawUoIConstructor: string

  constructor(event: CreateContentHolderEvent) {
    if (is_none(event.rawUoIConstructor)) {
      throw new ReferenceError(`Cannot find \`rawUoIConstructor\` in ${event}`)
    } else {
      this.nodeId = event.nodeId
      this.children = []
      this.rawUoIConstructor = event.rawUoIConstructor.unwrap() as string
    }
  }

  insertChild(node: never, insertIndex: number) {
    return this
  }

  removeChild(nodeId: string) {
    return this
  }
}

export default ContentHolder
