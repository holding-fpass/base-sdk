import { ProviderExtra } from "./provider";
import { Scope } from "./scope";
import { Whitelabel } from "./whitelabel";

export interface User {
  name: string;
  email: string;
  taxId: string;
  whitelabel: Whitelabel;
  scopes: Scope[];
  image128x128?: string;
  providerExtra?: ProviderExtra[];
}

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  DELETE = "deleted",
}
