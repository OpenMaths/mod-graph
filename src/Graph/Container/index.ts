import { CreateContainerEvent } from '@openmaths/graph-events'

import MultiChild from '../MultiChild'
import Row from '../Row'

class Container extends MultiChild<Row> {
  constructor(event: CreateContainerEvent) {
    super(event)
  }
}

export default Container
