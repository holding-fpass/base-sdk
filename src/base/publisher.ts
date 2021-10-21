import { BaseEvent, Client, EventType, ResourceBase } from "../schema";

export class Publisher {
  
  private static readonly client: Client

  async setup(eventTypes: EventType[]) {
    eventTypes.forEach(async eventType => {
      await Publisher.client.setupDestination(eventType);
    });
  }

  publish(event: BaseEvent) {
    return Publisher.client.publish(event);
  }
}