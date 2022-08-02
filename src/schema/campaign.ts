import { Resource, ResourceType } from "./resource";
import { Tag } from "./tag";

export enum CampaignStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const CampaignStatusTransitionMap = new Map<
  CampaignStatus,
  CampaignStatus[]
>([[CampaignStatus.CREATED, [CampaignStatus.ACTIVE]]]);

export class Campaign extends Resource {
  resourceType = ResourceType.PLAYLIST;
  name!: string;
  // Related
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
}
