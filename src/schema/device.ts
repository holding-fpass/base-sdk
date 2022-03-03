import { Resource } from "./resource";
import { User } from "./user";

export interface Device extends Resource {
  name: string;
  fingerprint: string;
  user: User;
}
