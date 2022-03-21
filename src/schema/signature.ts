import { Resource } from "./resource";
import { User } from "./user";

export interface Signature extends Resource {
  user: Partial<User>;
  footprint: string;
}
