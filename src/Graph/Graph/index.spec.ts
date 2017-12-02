import { CreateGraphEvent } from "@openmaths/graph-events"

import Graph from "."
import SingleChild from "../SingleChild"

describe("Graph", () => {
  it("extends SingleChild", () => {
    const event = new CreateGraphEvent()
    const subject = new Graph(event)
    expect(subject instanceof SingleChild).toEqual(true)
  })
})
