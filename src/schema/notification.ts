import { Timestamp } from "firebase-admin/firestore";
import { Campaign } from "schema";
import { Form } from "./form";
import { Resource, ResourceType, DisplayResource } from "./resource";
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
  DELETED = "deleted",
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
>([
  [
    NotificationStatus.CREATED,
    [NotificationStatus.ACTIVE, NotificationStatus.DELETED],
  ],
]);

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
  campaign?: Pick<Campaign, "resourceId" | "name">;
  // Schedule
  notBeforeAt?: string | Timestamp;
  deliveredAt?: string | Timestamp;
  // Usage
  readedAt?: string | Timestamp;
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    // NO "name" RELATIVE STRING FIELD
    const data = resource as Notification;
    return {
      resourceType: ResourceType.NOTIFICATION,
      resourceId: data.resourceId,
      h1: data.message?.body,
    };
  }
}
