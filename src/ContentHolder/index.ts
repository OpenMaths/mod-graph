import { CreateContentHolderEvent } from '@openmaths/graph-events'
import { is_none } from '@threestup/monads'

import * as I from '../interface'

class ContentHolder implements I.Node {
  readonly nodeId: string
           children: any[]
           rawUoIConstructor: string

  constructor (event: any) {
    if (is_none(event.rawUoIConstructor)) {
      throw new ReferenceError(`Cannot find \`rawUoIConstructor\` in ${event}`)
    } else {
      this.nodeId            = event.nodeId
      this.children          = []
      this.rawUoIConstructor = event.rawUoIConstructor.unwrap()
    }
  }

  insertChild (...args) {
    return this
  }

  removeChild (...args) {
    return this
  }
}

export default ContentHolder
