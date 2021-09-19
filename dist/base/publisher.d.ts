import { BaseEvent, Client, EventType, ResourceBase } from "../schema";
export declare class Publisher {
    private readonly client;
    protected event?: BaseEvent;
    constructor(client: Client);
    setup(eventType: EventType): any;
    create(eventType: EventType, resource: ResourceBase): BaseEvent;
    publish(): Promise<boolean>;
}
//# sourceMappingURL=publisher.d.ts.map