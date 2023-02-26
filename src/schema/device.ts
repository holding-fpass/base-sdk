import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { User } from "./user";

export class Device extends Resource implements SearchableResource {
  resourceType = ResourceType.DEVICE;
  name!: string;
  fingerprint!: string;
  user?: Partial<User>;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Device): DisplayResource<any, ResourceStatus> {
    return {
      resourceType: ResourceType.DEVICE,
      resourceId: resource.resourceId,
      h1: resource.name,
      isPublic: resource.isPublic,
      whitelabel: resource.whitelabel,
      status: ResourceStatus.CREATED,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
