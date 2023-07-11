import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Playlist } from "./playlist";
import { Whitelabel } from "./whitelabel";
import { ImageUtils } from "../media";

export enum ChannelStatus {
  CREATED = "created",
  ACTIVE = "active",
  PUBLISHED = "published",
  RESTRICTED = "restricted",
  DELETED = "deleted",
}

export const ChannelStatusTransitionMap = new Map<
  ChannelStatus,
  ChannelStatus[]
>([
  [ChannelStatus.CREATED, [ChannelStatus.ACTIVE, ChannelStatus.DELETED]],
  [ChannelStatus.ACTIVE, [ChannelStatus.PUBLISHED, ChannelStatus.RESTRICTED]],
  [ChannelStatus.PUBLISHED, [ChannelStatus.DELETED]],
  [ChannelStatus.RESTRICTED, [ChannelStatus.DELETED]],
]);

export class Channel
  extends Resource<ChannelStatus>
  implements SearchableResource {
  resourceType = ResourceType.CHANNEL;
  name!: string;
  description?: string;
  slug!: string;
  primaryColor!: string;
  resourceUrl!: string;
  whitelabel!: Whitelabel;
  isFree?: boolean;
  // Media
  image1400x720!: string;
  image160x40!: string;
  image416x224!: string;
  image64x64!: string;
  // Related
  playlists!: Partial<Playlist>[];
  // SearchableResource implementation
  isPublic = true;
  isSearchable = true;
  public static asDisplayResource(resource: Channel): DisplayResource<any, ChannelStatus> {
    return {
      resourceType: ResourceType.CHANNEL,
      resourceId: resource.resourceId,
      h1: resource.name,
      h2: resource.description,
      status: resource.status,
      isPublic: true,
      isSearchable: true,
      timestamp: resource.timestamp,
      imageUrl: ImageUtils.imageOptimized(
        resource.image160x40 as string,
        "160x40"
      ),
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
