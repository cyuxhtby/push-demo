import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { MessageUpdated } from "../generated/PushDemo/PushDemo"

export function createMessageUpdatedEvent(message: string): MessageUpdated {
  let messageUpdatedEvent = changetype<MessageUpdated>(newMockEvent())

  messageUpdatedEvent.parameters = new Array()

  messageUpdatedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )

  return messageUpdatedEvent
}
