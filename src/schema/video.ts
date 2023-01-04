import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { BaseEvent } from "../schema";
import { ProviderExtra } from "./provider";

export enum VideoStatus {
  CREATED = "created",
  PROVIDER_REQUESTED = "provider.requested",
  PROVIDER_CREATED = "provider.created",
  ACTIVE = "active",
}

export const VideoStatusTransitionMap = new Map<VideoStatus, VideoStatus[]>([
  [VideoStatus.CREATED, [VideoStatus.PROVIDER_REQUESTED]],
  [VideoStatus.PROVIDER_REQUESTED, [VideoStatus.PROVIDER_CREATED]],
  [VideoStatus.PROVIDER_CREATED, [VideoStatus.ACTIVE]],
]);

export class Video extends Resource<VideoStatus> implements SearchableResource {
  resourceType = ResourceType.VIDEO;
  // Product
  productId!: string;
  productType!: ResourceType.CONTENT;
  productVideoField!: string;
  resourceUrl?: string;
  // Provider
  externalId?: string;
  providerUrl?: string;
  providerExtra?: ProviderExtra[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Video;
    return {
      resourceType: ResourceType.VIDEO,
      resourceId: data.resourceId,
      h1: data.resourceUrl,
      status: data.status,
      isPublic: data.isPublic,
    };
  }
}

/**
 * Deprecated
 */

// Video
export interface VideoCreatedEventData {
  language: string;
}
export class VideoCreatedEvent extends BaseEvent<VideoCreatedEventData> {}
// Audio
export interface VideoAudioCreatedEventData {
  language: string;
  resourceUrl: string;
}
export class VideoAudioCreatedEvent extends BaseEvent<VideoAudioCreatedEventData> {}
// Subtitle
export interface VideoSubtitleRequestedEventData {
  language: string;
}
export class VideoSubtitleRequestedEvent extends BaseEvent<VideoSubtitleRequestedEventData> {}
