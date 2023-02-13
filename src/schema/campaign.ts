import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";
import {
  Form,
  NotificationMessage,
  NotificationTrigger,
  Story,
} from "../schema";

import { SystemTag, Tag } from "./tag";
import { Timestamp } from "firebase-admin/firestore";

export enum CampaignStatus {
  CREATED = "created",
  APPROVED = "approved",
  PROVIDER_PUSHNOTIFICATION_CREATED = "provider.pushNotification.created",
  ACTIVE = "active",
  CANCELED = "canceled",
  FAILED = "failed",
}

export const CampaignStatusTransitionMap = new Map<
  CampaignStatus,
  CampaignStatus[]
>([
  [CampaignStatus.CREATED, [CampaignStatus.APPROVED, CampaignStatus.CANCELED]],
  [
    CampaignStatus.APPROVED,
    [CampaignStatus.PROVIDER_PUSHNOTIFICATION_CREATED, CampaignStatus.CANCELED],
  ],
  [
    CampaignStatus.PROVIDER_PUSHNOTIFICATION_CREATED,
    [CampaignStatus.ACTIVE, CampaignStatus.CANCELED],
  ],
  [CampaignStatus.ACTIVE, [CampaignStatus.CREATED]],
]);

export class Campaign extends Resource implements SearchableResource {
  resourceType = ResourceType.CAMPAIGN;
  name!: string;
  // Actions
  textNotificationAction?: NotificationMessage;
  pushNotificationAction?: NotificationMessage;
  emailNotificationAction?: NotificationMessage;
  storiesAction?: {
    story?: Pick<Story, "resourceId" | "name">;
    trigger?: NotificationTrigger;
  };
  formsAction?: {
    form?: Pick<Form, "resourceId" | "name">;
    trigger?: NotificationTrigger;
  };
  // Date
  dateStart?: string | Timestamp;
  expiresAt?: string | Timestamp;
  cronExpression?: string;
  // Related
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
  __systemTag?: SystemTag;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Campaign): DisplayResource {
    return {
      resourceId: resource.resourceId,
      resourceType: ResourceType.CAMPAIGN,
      h1: resource.name,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      status: resource.status,
      isPublic: resource.isPublic,
    };
  }
}
