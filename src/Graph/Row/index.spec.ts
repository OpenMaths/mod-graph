import { CreateRowEvent, NodeId } from "@openmaths/graph-events"

import Row from "."
import MultiChild from "../MultiChild"

describe("Row", () => {
  it("extends MultiChild", () => {
    const event = new CreateRowEvent(
      NodeId.gen("Graph"),
      NodeId.gen("Container"),
    )
    const subject = new Row(event)
    expect(subject instanceof MultiChild).toEqual(true)
  })
})
