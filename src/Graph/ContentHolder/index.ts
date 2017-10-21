import { CreateContentHolderEvent } from "@openmaths/graph-events"

import Leaf from "../Leaf"

class ContentHolder extends Leaf {
  rawUoIConstructor: string

  constructor(event: CreateContentHolderEvent) {
    super(event)
    this.rawUoIConstructor = event.rawUoIConstructor
  }
}

export default ContentHolder
