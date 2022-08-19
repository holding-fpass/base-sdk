import { BaseEvent, EventType } from "../schema";
import { MessageBrokerClient } from "./messageBrokerClient";

export class Publisher {
  private static client: MessageBrokerClient;

  constructor(client: MessageBrokerClient) {
    Publisher.client = client;
  }

  async setup(eventTypes: EventType[] | string[]) {
    eventTypes.forEach(async (eventType) => {
      await Publisher.client.setupDestination(eventType);
    });
  }

  static setOwnerId(ownerId: string) {
    return Publisher.client.setOwnerId(ownerId);
  }

  static setOwnerExternalId(ownerExternalId: string) {
    return Publisher.client.setOwnerExternalId(ownerExternalId);
  }

  static publish<DelayTopic = string>(
    event: BaseEvent,
    delayTopic?: DelayTopic
  ) {
    return Publisher.client.publish(event, delayTopic);
  }

  static publishForWhitelabel(event: BaseEvent) {
    return Publisher.client.publishForWhitelabel(event);
  }
}
