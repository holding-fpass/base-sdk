import { BaseEvent, Client, ClientHandleFunction, EventType, ResourceBase } from "../schema";

export class Subscriber {

  static readonly client: Client

  setup(eventType: EventType) {
    return Subscriber.client.setupSource(eventType);
  }
  
  listen(eventType: EventType, handleMessage: ClientHandleFunction, handleError: ClientHandleFunction) {
    Subscriber.client.onMessage(eventType, handleMessage)
    Subscriber.client.onError(eventType, handleError)
  }
}