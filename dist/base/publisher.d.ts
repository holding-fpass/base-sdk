import { BaseEvent, Client, EventType } from "../schema";
export declare class Publisher {
    private readonly client;
    constructor(client: Client);
    setup(eventType: EventType): any;
    publish(event: BaseEvent): Promise<boolean>;
}
