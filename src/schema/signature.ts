import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export class Signature extends Resource {
  resourceType = ResourceType.SIGNATURE;
  user!: Partial<User>;
  footprint!: string;
}
