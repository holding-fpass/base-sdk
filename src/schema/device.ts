import { Resource, ResourceType, DisplayResource } from "./resource";
import { User } from "./user";

export class Device extends Resource {
  resourceType = ResourceType.DEVICE;
  name!: string;
  fingerprint!: string;
  user?: Partial<User>;
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Device;
    return {
      resourceType: ResourceType.DEVICE,
      resourceId: data.resourceId,
      h1: data.name,
    };
  }
}
