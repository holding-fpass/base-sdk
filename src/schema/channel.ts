import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Playlist } from "./playlist";
import { Whitelabel } from "./whitelabel";

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
  implements SearchableResource
{
  resourceType = ResourceType.CHANNEL;
  transitionMap = ChannelStatusTransitionMap;
  name!: string;
  slug!: string;
  primaryColor!: string;
  resourceUrl!: string;
  whitelabel!: Whitelabel;
  // Media
  image1400x720!: string;
  image160x40!: string;
  image416x224!: string;
  image64x64!: string;
  // Related
  playlists!: Partial<Playlist>[];
  // SearchableResource implementation
  isPublic = true;
  public static asDisplayResource(resource: Channel): DisplayResource {
    return {
      resourceType: ResourceType.CHANNEL,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: true,
      isSearchable: resource?.isSearchable,
    };
  }
}
