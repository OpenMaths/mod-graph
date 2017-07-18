import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { is_some } from '@threestup/monads'

import * as I from '../interface'

class ContentHolder implements I.Node {
  readonly nodeId: string
  children: never[]
  rawUoIConstructor: string

  constructor(event: CreateContentHolderEvent) {
    const { nodeId, rawUoIConstructor } = event

    if (is_some(rawUoIConstructor)) {
      this.nodeId = nodeId
      this.children = []
      this.rawUoIConstructor = rawUoIConstructor.unwrap()
    } else {
      throw new ReferenceError(`Cannot find \`rawUoIConstructor\` in ${event}`)
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
