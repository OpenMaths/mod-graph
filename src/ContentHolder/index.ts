import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { is_some } from '@threestup/monads'

import * as I from '../interface'

class ContentHolder implements I.NodeSingle {
  readonly nodeId: string
  child: never
  rawUoIConstructor: string

  constructor(event: CreateContentHolderEvent) {
    const { nodeId, rawUoIConstructor } = event

    if (is_some(rawUoIConstructor)) {
      this.nodeId = nodeId
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
