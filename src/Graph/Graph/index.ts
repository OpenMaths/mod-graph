import { CreateGraphEvent } from '@openmaths/graph-events'

import Container from '../Container'
import SingleChild from '../SingleChild'

class Graph extends SingleChild<Container> {
  constructor(event: CreateGraphEvent) {
    super(event)
  }
}

export default Graph
