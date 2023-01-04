import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";
import { Form, NotificationMessage, Story } from "../schema";

import { Tag } from "./tag";
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
  };
  formsAction?: {
    form?: Pick<Form, "resourceId" | "name">;
  };
  // Date
  dateStart?: string | Timestamp;
  cronExpression?: string;
  // Related
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Campaign;
    return {
      resourceType: ResourceType.CAMPAIGN,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status,
      isPublic: data.isPublic,
    };
  }
}
