import { BaseEvent, Client, EventType, ResourceBase } from "../schema";

export class Publisher {
  
  private static client: Client;

  constructor(client: Client) {
    Publisher.client = client;
  }

  async setup(eventTypes: EventType[]) {
    eventTypes.forEach(async eventType => {
      await Publisher.client.setupDestination(eventType);
    });
  }

  static publish(event: BaseEvent) {
    return Publisher.client.publish(event);
  }
}