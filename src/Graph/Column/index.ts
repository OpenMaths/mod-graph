import { CreateColumnEvent } from "@openmaths/graph-events"

import Container from "../Container"
import ContentHolder from "../ContentHolder"
import SingleChild from "../SingleChild"

type Child = Container | ContentHolder

class Column extends SingleChild<Child> {
  constructor(event: CreateColumnEvent) {
    super(event)
  }
}

export { Child }
export default Column
