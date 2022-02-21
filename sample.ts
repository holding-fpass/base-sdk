import { BaseEvent, Publisher, PubSubClient, Subscriber } from "./src";
import { v4 as uuidv4 } from "uuid";

// Define Client
const client = new PubSubClient("app-test", "project-id");

// Prepare Subscriber
const subscriber = new Subscriber(client);
// Configure Subscription
subscriber.setup(["generic"]);
// Listen
Subscriber.listen(
  "generic",
  (message, second) => {
    console.log(message);
    message.ack();
  },
  (error) => {
    console.log(error);
  }
);

// Prepare Publisher
const publisher = new Publisher(client);
// Configure Topic on service infrastructure
publisher.setup(["generic"]);
// Create Event
const event = new BaseEvent({
  eventType: "generic",
  resourceId: uuidv4(),
  resourceType: "dataevent",
});
// Publish
Publisher.publish(event);
