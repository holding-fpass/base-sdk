import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export enum NotificationStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum NotificationType {
  TEXT = "text",
  PUSH = "push",
  EMAIL = "email",
}

export const NotificationStatusTransitionMap = new Map<
  NotificationStatus,
  NotificationStatus[]
>([[NotificationStatus.CREATED, [NotificationStatus.ACTIVE]]]);

export class Notification extends Resource<NotificationStatus> {
  resourceType = ResourceType.NOTIFICATION;
  type!: NotificationType;
  user!: Pick<User, "resourceId" | "name" | "email">;
  // Message
  header?: string;
  body?: string;
  // Dates
  notBeforeAt?: string;
  deliveredAt?: string;
  readedAt?: string;
}
