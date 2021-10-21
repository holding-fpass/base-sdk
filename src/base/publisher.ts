import { BaseEvent, Client, EventType, ResourceBase } from "../schema";

export class Publisher {

  constructor(
    private readonly client: Client
  ) {}

  setup(eventType: EventType) {
    return this.client.setupDestination(eventType);
  }

  publish(event: BaseEvent) {
    return this.client.publish(event);
  }
}