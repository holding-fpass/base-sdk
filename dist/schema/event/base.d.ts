import { ResourceBase } from '../resource';
import { EventType } from './type';
export declare class BaseEvent extends ResourceBase {
    eventType: EventType;
    eventId: string;
    eventDate: string;
    constructor(eventType: EventType, resource: ResourceBase);
}
