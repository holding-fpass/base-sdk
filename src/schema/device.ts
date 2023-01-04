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
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Device;
    return {
      resourceType: ResourceType.DEVICE,
      resourceId: data.resourceId,
      h1: data.name,
      isPublic: data.isPublic,
    };
  }
}
