import { ProviderExtra } from "./provider";

export interface User {
  name: string;
  email: string;
  providerExtra: ProviderExtra[];
}

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  DELETE = "deleted",
}
