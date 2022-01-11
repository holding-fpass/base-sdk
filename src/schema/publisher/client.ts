import { BaseEvent, EventType } from "..";

export type ClientHandleFunction = (...args: any[]) => void;

export interface Client {
  setupDestination(eventType: EventType | string): any;
  setupSource(eventType: EventType | string): any;
  publish(event?: BaseEvent): Promise<boolean>;
  publishForWhitelabel(event?: BaseEvent): Promise<boolean>;
  onMessage(eventType: EventType | string, handle: ClientHandleFunction): void;
  onError(eventType: EventType | string, handle: ClientHandleFunction): void;
  setOwnerId(ownerId: string): void;
  setOwnerExternalId(ownerExternalId: string): void;
}
