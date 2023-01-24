import {
  DisplayResource,
  Resource,
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
  public static asDisplayResource(resource: Device): DisplayResource {
    return {
      resourceType: ResourceType.DEVICE,
      resourceId: resource.resourceId,
      h1: resource.name,
      isPublic: resource.isPublic,
    };
  }
}
