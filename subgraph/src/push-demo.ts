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
  subject = "Message Updated",
  message = `Message: ${entity.message} updated by ${recipient}`,
  image = "https://th.bing.com/th/id/R.27bde601699590513d04b36bd6d5b014?rik=7yTbEVhJ3mT%2bTA&riu=http%3a%2f%2fthewondrous.com%2fwp-content%2fuploads%2f2015%2f04%2fimages-of-funny-monkeys-696x1024.jpg&ehk=V%2bz9czGLPGDkm6R5LH52WaSwupc81%2b2CkKxXGO0mBJE%3d&risl=&pid=ImgRaw&r=0",
  secret = "null",
  cta = "https://framed.gg/"

  // Define Notification
  let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`

  // Call the Push Helper Function
  sendPushNotification (recipient, notification)
}

export const subgraphID = "cyuxhtby/push-demo/"
