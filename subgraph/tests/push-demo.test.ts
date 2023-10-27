import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { MessageUpdated } from "../generated/schema"
import { MessageUpdated as MessageUpdatedEvent } from "../generated/PushDemo/PushDemo"
import { handleMessageUpdated } from "../src/push-demo"
import { createMessageUpdatedEvent } from "./push-demo-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let message = "Example string value"
    let newMessageUpdatedEvent = createMessageUpdatedEvent(message)
    handleMessageUpdated(newMessageUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MessageUpdated created and stored", () => {
    assert.entityCount("MessageUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MessageUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
