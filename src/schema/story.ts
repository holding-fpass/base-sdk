import {
  Resource,
  ResourceType,
  DisplayResource,
  SearchableResource,
} from "./resource";
import { Tag } from "./tag";

export enum StoryItemType {
  IMAGE = "story-item.type.image",
  VIDEO = "story-item.type.video",
}
export class StoryItem {
  type?: StoryItemType;
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

export class Story extends Resource<StoryStatus> implements SearchableResource {
  resourceType = ResourceType.STORY;
  name!: string;
  trigger?: StoryTrigger;
  // Media
  items?: StoryItem[];
  // Related
  _systemTags?: Partial<Tag>[];
  userTags?: Partial<Tag>[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Story;
    return {
      resourceType: ResourceType.STORY,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status,
    };
  }
}
