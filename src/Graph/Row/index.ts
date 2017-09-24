import { CreateRowEvent } from '@openmaths/graph-events'

import Column from '../Column'
import MultiChild from '../MultiChild'

class Row extends MultiChild<Column> {
  constructor(event: CreateRowEvent) {
    super(event)
  }
}

export default Row
