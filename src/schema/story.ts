import { Resource, ResourceType } from "./resource";
import { Tag } from "./tag";

export class StoryItem {
  image1080x1920?: string;
  image1080x1920_alt?: string;
  video1080X1920?: string;
  video1080X1920_alt?: string;
  cta?: string;
  ctaUrl?: string;
}

export enum StoryStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum StoryTrigger {
  APP_OPEN = "story.trigger.app.open",
}

export class Story extends Resource<StoryStatus> {
  resourceType = ResourceType.STORY;
  name!: string;
  trigger?: StoryTrigger;
  // Media
  items?: StoryItem[];
  // Related
  _systemTags?: Partial<Tag>[];
  userTags?: Partial<Tag>[];
}
