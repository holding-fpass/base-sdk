import { BaseEvent, Client, ClientHandleFunction, EventType, ResourceBase } from "../schema";

export class Subscriber {

  protected event?: BaseEvent;

  constructor(
    private readonly client: Client
  ) {}

  setup(eventType: EventType) {
    return this.client.setupSource(eventType);
  }
  
  listen(eventType: EventType, handleMessage: ClientHandleFunction, handleError: ClientHandleFunction) {
    this.client.onMessage(eventType, handleMessage)
    this.client.onError(eventType, handleError)
  }
}