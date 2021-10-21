import { BaseEvent, Client, ClientHandleFunction, EventType, ResourceBase } from "../schema";

export class Subscriber {

  private static client: Client;

  constructor(client: Client) {
    Subscriber.client = client;
  }

  async setup(eventTypes: EventType[]) {
    eventTypes.forEach(async eventType => {
      await Subscriber.client.setupSource(eventType);
    });
  }
  
  listen(eventType: EventType, handleMessage: ClientHandleFunction, handleError: ClientHandleFunction) {
    Subscriber.client.onMessage(eventType, handleMessage)
    Subscriber.client.onError(eventType, handleError)
  }
}