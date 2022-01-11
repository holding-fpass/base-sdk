import { ResourceType } from "../resource";
import { EventType } from "./type";
import { v4 as uuidv4 } from "uuid";

export interface SlimEvent {
  id: string;
  date: string;
}
export class BaseEvent {
  public eventId: string = uuidv4();
  public eventDate: string = new Date().toISOString();

  constructor(
    public eventType: EventType | string,
    public resourceId?: string,
    public resourceType?: ResourceType | string,
    public parentId?: string,
    public parentType?: ResourceType | string,
    public data?: any,
    public ownerId?: string,
    public ownerExternalId?: string,
    public whitelabel?: string
  ) {}

  asSlimEvent(): SlimEvent {
    return {
      id: this.eventId,
      date: this.eventDate,
    };
  }
}
