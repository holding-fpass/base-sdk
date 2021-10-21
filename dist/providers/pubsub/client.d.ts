import { Client } from "../..";
import { EventType, BaseEvent, ClientHandleFunction } from "../../schema";
import { PubSub } from "@google-cloud/pubsub";
export declare class PubSubClient implements Client {
    readonly id: string;
    readonly projectId: string;
    readonly pubsub: PubSub;
    constructor(id: string, projectId: string);
    private subscriptionName;
    setupSource(eventType: EventType): Promise<import("@google-cloud/pubsub").Subscription>;
    setupDestination(eventType: EventType): Promise<import("@google-cloud/pubsub").Topic>;
    publish(event: BaseEvent): Promise<boolean>;
    onMessage(eventType: EventType, handle: ClientHandleFunction): Promise<void>;
    onError(eventType: EventType, handle: ClientHandleFunction): Promise<void>;
}
