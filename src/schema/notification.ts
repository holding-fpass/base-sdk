import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Campaign } from "schema";
import { Form } from "./form";
import { Story } from "./story";
import { Timestamp } from "firebase-admin/firestore";
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

export class Notification
  extends Resource<NotificationStatus>
  implements SearchableResource
{
  resourceType = ResourceType.NOTIFICATION;
  type!: NotificationType;
  // User
  user!: Pick<User, "resourceId" | "name">;
  to!: string;
  // Message
  message?: NotificationMessage;
  // Related
  form?: Pick<Form, "resourceId" | "name">;
  story?: Pick<Story, "resourceId" | "name" | "trigger">;
  campaign?: Pick<Campaign, "resourceId" | "name">;
  // Schedule
  notBeforeAt?: string | Timestamp;
  deliveredAt?: string | Timestamp;
  expiresAt?: string | Timestamp;
  // Usage
  readedAt?: string | Timestamp;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Notification): DisplayResource {
    // NO "name" RELATIVE STRING FIELD
    return {
      resourceType: ResourceType.NOTIFICATION,
      resourceId: resource.resourceId,
      h1: resource.message?.body,
      isPublic: resource.isPublic,
    };
  }
}
