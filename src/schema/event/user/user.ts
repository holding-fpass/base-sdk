export interface User {
  name: string;
}

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  DELETE = "deleted",
}
