import { BaseEvent, Client, EventType, ResourceBase } from "../schema";

export class Publisher {
  private static client: Client;

  constructor(client: Client) {
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

  static publish(event: BaseEvent) {
    return Publisher.client.publish(event);
  }
}
