import {
  DisplayResource,
  Resource,
  ResourceStatus,
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
  trigger?: NotificationTrigger;
}

export enum NotificationTrigger {
  NONE = "notification.trigger.none",
  APP_OPEN = "notification.trigger.app.open",
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
  extends Resource<NotificationStatus, NotificationType>
  implements SearchableResource {
  resourceType = ResourceType.NOTIFICATION;
  // User
  user!: Pick<User, "resourceId" | "name">;
  to!: string;
  // Message
  message?: NotificationMessage;
  // Related
  form?: Pick<Form, "resourceId" | "name">;
  story?: Pick<Story, "resourceId" | "name">;
  campaign?: Pick<Campaign, "resourceId" | "name">;
  // @ts-ignore
  deletedAt: string | Timestamp | null = null;
  expiresAt?: string | Timestamp;
  // Schedule
  notBeforeAt?: string | Timestamp;
  deliveredAt?: string | Timestamp;
  trigger?: NotificationTrigger;
  // Usage
  readed?: boolean;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Notification): DisplayResource<NotificationType, ResourceStatus> {
    // NO "name" RELATIVE STRING FIELD
    return {
      type: resource.type,
      readed: resource.readed,
      resourceType: ResourceType.NOTIFICATION,
      resourceId: resource.resourceId,
      h1: resource.message?.body,
      isPublic: resource.isPublic,
      whitelabel: resource.whitelabel,
      status: ResourceStatus.CREATED,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt as string | Timestamp | undefined,
    };
  }
}
