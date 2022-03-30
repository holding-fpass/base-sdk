import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export class Device extends Resource {
  resourceType = ResourceType.DEVICE;
  name!: string;
  fingerprint!: string;
  user?: Partial<User>;
}
