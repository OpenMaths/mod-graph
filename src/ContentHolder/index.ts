import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { is_some } from '@threestup/monads'

import * as I from '../interface'

class ContentHolder implements I.NodeSingle {
  readonly nodeId: string
  readonly index: number
  child: never
  rawUoIConstructor: string

  constructor(event: CreateContentHolderEvent) {
    const { nodeId, rawUoIConstructor, insertIndex } = event

    if (is_some(rawUoIConstructor)) {
      this.nodeId = nodeId
      this.index = insertIndex.unwrap_or(0)
      this.rawUoIConstructor = rawUoIConstructor.unwrap()
    } else {
      throw new ReferenceError(
        `Cannot find \`rawUoIConstructor\` for ${event.nodeId}`,
      )
    }
  }

  insertChild(node: never) {
    return this
  }

  removeChild() {
    return this
  }
}

export default ContentHolder
