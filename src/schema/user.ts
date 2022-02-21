import { Metadata } from "./metadata";
import { ProviderExtra } from "./provider";

export interface User {
  name: string;
  email: string;
  taxId: string;
  image128x128: string;
  providerExtra: ProviderExtra[];
}

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  DELETE = "deleted",
}
