import { Form } from "./form";
import { Resource, ResourceType } from "./resource";
import { Story } from "./story";
import { User } from "./user";

export class NotificationMessage {
  header!: string;
  body!: string;
  cta?: string;
  ctaUrl?: string;
}

export enum NotificationStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum NotificationType {
  TEXT = "text",
  PUSH = "push",
  EMAIL = "email",
  STORY = "story",
  FORM = "form",
}

export const NotificationStatusTransitionMap = new Map<
  NotificationStatus,
  NotificationStatus[]
>([[NotificationStatus.CREATED, [NotificationStatus.ACTIVE]]]);

export class Notification extends Resource<NotificationStatus> {
  resourceType = ResourceType.NOTIFICATION;
  type!: NotificationType;
  // User
  user!: Pick<User, "resourceId" | "name">;
  to!: string;
  // Message
  message?: NotificationMessage;
  // Related
  form?: Pick<Form, "resourceId" | "name">;
  story?: Pick<Story, "resourceId" | "name">;
  // Schedule
  notBeforeAt?: string;
  deliveredAt?: string;
  // Usage
  readedAt?: string;
}