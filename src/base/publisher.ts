import { BaseEvent, Client, EventType, ResourceBase } from "../schema";

export class Publisher {

  constructor(
    private readonly client: Client
  ) {}

  setup(eventType: EventType) {
    return this.client.setupDestination(eventType);
  }
  
  create(eventType: EventType, resource: ResourceBase): BaseEvent {
    return new BaseEvent(eventType, resource);
  }

  publish(event: BaseEvent) {
    return this.client.publish(event);
  }
}