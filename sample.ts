import { PubSubClient, Publisher } from "./src";
import { EventType, ResourceType, BaseEvent } from "./src/schema";
import { v4 as uuidv4 } from "uuid";
import { Subscriber } from "./src/base";

// Define Client
const client = new PubSubClient('app-test', 'project-id');

// Prepare Subscriber
const subscriber = new Subscriber(client);
// Configure Subscription
subscriber.setup([EventType.GenericEventCreated]);
// Listen
subscriber.listen(EventType.GenericEventCreated,
  (message, second) => {
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
publisher.setup([EventType.GenericEventCreated]);
// Create Event
const event = new BaseEvent(EventType.GenericEventCreated, {
  resourceId: uuidv4(),
  resourceType: ResourceType.DataEvent
})
// Publish
publisher.publish(event);