import { BaseEvent, Client, EventType, ResourceBase } from "../schema";

export class Publisher {

  protected event?: BaseEvent;

  constructor(
    private readonly client: Client
  ) {}

  setup(eventType: EventType) {
    return this.client.setupDestination(eventType);
  }
  
  create(eventType: EventType, resource: ResourceBase): BaseEvent {
    return this.event = new BaseEvent(eventType, resource);
  }

  publish() {
    return this.client.publish(this.event);
  }
}