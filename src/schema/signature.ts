import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { User } from "./user";

export class Signature extends Resource implements SearchableResource {
  resourceType = ResourceType.SIGNATURE;
  user!: Partial<User>;
  footprint!: string;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Signature): DisplayResource {
    return {
      resourceType: ResourceType.SIGNATURE,
      resourceId: resource.resourceId,
      h1: resource.footprint,
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
