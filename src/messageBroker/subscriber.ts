import { EventType } from "../schema";
import {
  MessageBrokerClient,
  MessageBrokerHandleFunction,
} from "./messageBrokerClient";

export class Subscriber {
  private static client: MessageBrokerClient;

  constructor(client: MessageBrokerClient) {
    Subscriber.client = client;
  }

  async setup(eventTypes: EventType[] | string[]) {
    eventTypes.forEach(async (eventType) => {
      await Subscriber.client.setupSource(eventType);
    });
  }

  static listen(
    eventType: EventType | string,
    handleMessage: MessageBrokerHandleFunction,
    handleError: MessageBrokerHandleFunction
  ) {
    Subscriber.client.onMessage(eventType, handleMessage);
    Subscriber.client.onError(eventType, handleError);
  }
}
