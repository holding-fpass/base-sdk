import {
  DisplayResource,
  Resource,
  ResourceType,
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
  duration?: number;
  cta?: string;
  ctaUrl?: string;
}

export enum StoryStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum StoryTrigger {
  NONE = "story.trigger.none",
  APP_OPEN = "story.trigger.app.open",
}

export class Story extends Resource<StoryStatus> implements SearchableResource {
  resourceType = ResourceType.STORY;
  name!: string;
  trigger?: StoryTrigger;
  // Media
  items?: StoryItem[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Story): DisplayResource {
    return {
      resourceType: ResourceType.STORY,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: resource.isPublic,
    };
  }
}
