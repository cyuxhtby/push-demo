import { MessageUpdated as MessageUpdatedEvent } from "../generated/PushDemo/PushDemo"
import { MessageUpdated } from "../generated/schema"

export function handleMessageUpdated(event: MessageUpdatedEvent): void {
  let entity = new MessageUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.message = event.params.message

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
