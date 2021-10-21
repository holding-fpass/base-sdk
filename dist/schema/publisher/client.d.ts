import { BaseEvent, EventType } from "..";
export declare type ClientHandleFunction = (...args: any[]) => void;
export interface Client {
    setupDestination(eventType: EventType): any;
    setupSource(eventType: EventType): any;
    publish(event?: BaseEvent): Promise<boolean>;
    onMessage(eventType: EventType, handle: ClientHandleFunction): void;
    onError(eventType: EventType, handle: ClientHandleFunction): void;
}
