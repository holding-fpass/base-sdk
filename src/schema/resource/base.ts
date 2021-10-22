import { ResourceType } from "./type";

export class ResourceBase {
  constructor(
    public resourceId: string,
    public resourceType: ResourceType | string,
    public data?: any
  ) {}
}
