import { PubSubClient, Publisher } from ".";
import { EventType, ResourceType } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { Subscriber } from "./base";

// Define Client
const client = new PubSubClient('app-test', 'project-id');

// Prepare Subscriber
const subscriber = new Subscriber(client);
// Configure Subscription
subscriber.setup(EventType.GenericEventCreated);
// Listen
subscriber.listen(EventType.GenericEventCreated,
  (message) => {
    console.log(message)
    message.ack();
  },
  (error) => {
    console.log(error)
  }
)

// Prepare Publisher
const publisher = new Publisher(client)
// Configure Topic on service infrastructure
publisher.setup(EventType.GenericEventCreated);
// Create
const event = publisher.create(EventType.GenericEventCreated, {
  resourceId: uuidv4(),
  resourceType: ResourceType.DataEvent
})
console.log(event);
// Publish
publisher.publish();