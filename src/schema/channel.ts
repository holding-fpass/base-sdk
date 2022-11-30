import { Playlist } from "./playlist";
import { Resource, ResourceType } from "./resource";
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

export class Channel extends Resource<ChannelStatus> {
  resourceType = ResourceType.CHANNEL;
  transitionMap = ChannelStatusTransitionMap;
  name!: string;
  slug!: string;
  primaryColor!: string;
  externalUrl!: string;
  whitelabel!: Whitelabel;
  // Media
  image1400x720!: string;
  image160x40!: string;
  image416x224!: string;
  image64x64!: string;
  // Related
  playlists!: Partial<Playlist>[];
}
