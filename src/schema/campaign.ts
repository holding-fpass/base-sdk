import { Resource, ResourceType } from "./resource";
import { Tag } from "./tag";

export class CampaignTextNotificationAction {
  header!: string;
  body!: string;
}

export class CampaignPushNotificationAction {
  header!: string;
  body!: string;
}

export class CampaignEmailNotificationAction {
  header!: string;
  body!: string;
}

export class CampaignStoriesAction {
  resourceId!: string;
  name!: string;
}

export class CampaignFormsAction {
  resourceId!: string;
  name!: string;
}

export enum CampaignStatus {
  CREATED = "created",
  APPROVED = "approved",
  PROVIDER_PUSHNOTIFICATION_CREATED = "provider.pushNotification.created",
  ACTIVE = "active",
  CANCELED = "canceled",
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
]);

export class Campaign extends Resource {
  resourceType = ResourceType.PLAYLIST;
  name!: string;
  // Actions
  textNotificationAction?: CampaignTextNotificationAction;
  pushNotificationAction?: CampaignPushNotificationAction;
  emailNotificationAction?: CampaignEmailNotificationAction;
  storiesAction?: CampaignStoriesAction;
  formsAction?: CampaignFormsAction;
  // Date
  dateStart?: string;
  cronExpression?: string;
  // Related
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
}
