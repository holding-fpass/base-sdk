import { Resource, ResourceType, DisplayResource } from "./resource";
import { User } from "./user";

export class Signature extends Resource {
  resourceType = ResourceType.SIGNATURE;
  user!: Partial<User>;
  footprint!: string;
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Signature;
    return {
      resourceType: ResourceType.SIGNATURE,
      resourceId: data.resourceId,
      h1: data.footprint,
    };
  }
}
