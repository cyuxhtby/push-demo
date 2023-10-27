import { MessageUpdated as MessageUpdatedEvent } from "../generated/PushDemo/PushDemo"
import { MessageUpdated } from "../generated/schema"
import { sendPushNotification } from "./PushNotification"

export function handleMessageUpdated(event: MessageUpdatedEvent): void {
  let entity = new MessageUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.message = event.params.message

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Define Notification Payload Items
  let recipient = event.transaction.from.toHexString(),
  type = "1",
  title = "Message Updated",
  body = `Message: ${entity.message} updated by ${recipient}`,
  subject = "This is the subject",
  message = "This is the message",
  image = "https://thumbs.dreamstime.com/b/alpaca-funny-hair-stands-out-blue-sky-background-detailed-headshot-which-allows-you-to-clearly-54343701.jpg",
  secret = "null",
  cta = "https://framed.gg/"

  // Define Notification
  let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`

  // Call the Push Helper Function
  sendPushNotification (recipient, notification)
}

export const subgraphID = "cyuxhtby/push-demo/"
