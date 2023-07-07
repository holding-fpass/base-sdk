import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

export enum StoryItemType {
  IMAGE = "story-item.type.image",
  VIDEO = "story-item.type.video",
}
export class StoryItem {
  type?: StoryItemType;
  image1080x1920?: string;
  image1080x1920_alt?: string;
  video1080x1920?: string;
  video1080x1920_alt?: string;
  duration?: string;
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
  public static asDisplayResource(resource: Story): DisplayResource<any, StoryStatus> {
    return {
      resourceType: ResourceType.STORY,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: resource.isPublic,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
