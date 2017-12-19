import { CreateContainerEvent, NodeId } from "@openmaths/graph-events"

import Container from "."
import MultiChild from "../MultiChild"

describe("Container", () => {
  it("extends MultiChild", () => {
    const event = new CreateContainerEvent(NodeId.gen("Graph"), NodeId.gen("Graph"))
    const subject = new Container(event)
    expect(subject instanceof MultiChild).toEqual(true)
  })
})
