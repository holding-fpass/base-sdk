import { BaseEvent, Client, ClientHandleFunction, EventType } from "../schema";
export declare class Subscriber {
    private readonly client;
    protected event?: BaseEvent;
    constructor(client: Client);
    setup(eventType: EventType): any;
    listen(eventType: EventType, handleMessage: ClientHandleFunction, handleError: ClientHandleFunction): void;
}
