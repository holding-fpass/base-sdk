import { BaseEvent, EventType } from "schema";

export type MessageBrokerHandleFunction = (...args: any[]) => void;

export interface MessageBrokerClient {
  setupDestination(eventType: EventType | string): any;
  setupSource(eventType: EventType | string): any;
  publish(event?: BaseEvent): Promise<boolean>;
  publishForWhitelabel(event?: BaseEvent): Promise<boolean>;
  onMessage(
    eventType: EventType | string,
    handle: MessageBrokerHandleFunction
  ): void;
  onError(
    eventType: EventType | string,
    handle: MessageBrokerHandleFunction
  ): void;
  setOwnerId(ownerId: string): void;
  setOwnerExternalId(ownerExternalId: string): void;
}
