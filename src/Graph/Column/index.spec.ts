import { CreateColumnEvent, NodeId } from "@openmaths/graph-events"

import Column from "."
import SingleChild from "../SingleChild"

describe("ContentHolder", () => {
  it("extends SingleChild", () => {
    const event = new CreateColumnEvent(NodeId.gen("Graph"), NodeId.gen("Row"))
    const subject = new Column(event)
    expect(subject instanceof SingleChild).toEqual(true)
  })
})
