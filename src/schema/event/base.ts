import { ResourceBase, ResourceType } from "../resource";
import { EventType } from "./type";
import { v4 as uuidv4 } from "uuid";
export class BaseEvent extends ResourceBase {
  public eventId: string = uuidv4();
  public eventDate: string = new Date().toISOString();

  constructor(
    public eventType: EventType | string,
    public resource: ResourceBase,
    public ownerId?: string
  ) {
    super(resource.resourceId, resource.resourceType, resource.data);
  }
}
