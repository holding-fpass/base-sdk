import { ResourceType } from "./resource";
import { EventType } from "./eventType";
import { v4 as uuidv4 } from "uuid";

export interface SlimEvent {
  id: string;
  date: string;
}

export interface BaseEventOptions {
  eventType: EventType | string;
  resourceId?: string;
  resourceType?: ResourceType | string;
  parentId?: string;
  parentType?: ResourceType | string;
  data?: any;
  ownerId?: string;
  ownerExternalId?: string;
  whitelabel?: string;
}
export class BaseEvent {
  public eventId: string = uuidv4();
  public eventDate: string = new Date().toISOString();

  public eventType: EventType | string;
  public resourceId?: string;
  public resourceType?: ResourceType | string;
  public parentId?: string;
  public parentType?: ResourceType | string;
  public data?: any;
  public ownerId?: string;
  public ownerExternalId?: string;
  public whitelabel?: string;

  constructor(options: BaseEventOptions) {
    this.eventType = options.eventType ?? undefined;
    this.resourceId = options.resourceId ?? undefined;
    this.resourceType = options.resourceType ?? undefined;
    this.parentId = options.parentId ?? undefined;
    this.parentType = options.parentType ?? undefined;
    this.data = options.data ?? undefined;
    this.ownerId = options.ownerId ?? undefined;
    this.ownerExternalId = options.ownerExternalId ?? undefined;
    this.whitelabel = options.whitelabel ?? undefined;
  }

  asSlimEvent(): SlimEvent {
    return {
      id: this.eventId,
      date: this.eventDate,
    };
  }
}
