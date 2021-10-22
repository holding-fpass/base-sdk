import { ResourceBase, ResourceType } from "../resource";
import { EventType } from "./type";
import { v4 as uuidv4 } from "uuid";
import { ApiProperty } from "@nestjs/swagger";

export class BaseEvent extends ResourceBase {
  @ApiProperty()
  public eventId: string = uuidv4();
  @ApiProperty()
  public eventDate: string = new Date().toISOString();

  constructor(
    public eventType: EventType | string,
    public resource: ResourceBase
  ) {
    super(resource.resourceId, resource.resourceType, resource.data);
  }
}
