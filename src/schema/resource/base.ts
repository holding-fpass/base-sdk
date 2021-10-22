import { ApiProperty } from "@nestjs/swagger";
import { ResourceType } from "./type";

export abstract class ResourceBase {
  @ApiProperty()
  public resourceId: string;
  @ApiProperty()
  public resourceType: ResourceType | string;
  @ApiProperty()
  public data?: any;

  constructor(
    resourceId: string,
    resourceType: ResourceType | string,
    data?: any
  ) {
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.data = data;
  }
}
