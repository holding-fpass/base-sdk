import { Story, Form } from "schema";
import { Resource, ResourceType } from "./resource";
import { Tag } from "./tag";

export class CampaignTextNotificationAction {
  header!: string;
  body!: string;
  cta?: string;
  ctaUrl?: string;
}

export class CampaignPushNotificationAction {
  header!: string;
  body!: string;
  cta?: string;
  ctaUrl?: string;
}

export class CampaignEmailNotificationAction {
  header!: string;
  body!: string;
}

export class CampaignStoriesAction {
  story!: Pick<Story, "resourceId" | "name">;
}

export class CampaignFormsAction {
  form!: Pick<Form, "resourceId" | "name">;
}

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
]);

export class Campaign extends Resource {
  resourceType = ResourceType.CAMPAIGN;
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
