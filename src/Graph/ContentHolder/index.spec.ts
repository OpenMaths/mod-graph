import { CreateContentHolderEvent, NodeId } from "@openmaths/graph-events"

import ContentHolder from "."
import Leaf from "../Leaf"

describe("ContentHolder", () => {
  it("extends Leaf", () => {
    const event = new CreateContentHolderEvent(NodeId.gen("Graph"), NodeId.gen("Column"), "uoi:abc-123")
    const subject = new ContentHolder(event)
    expect(subject instanceof Leaf).toEqual(true)
  })
})
