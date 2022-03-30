import { Playlist } from "./playlist";
import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

export enum ChannelStatus {
  CREATED = "created",
  ACTIVE = "active",
  PUBLISHED = "published",
  RESTRICTED = "restricted",
}

export const ChannelStatusTransitionMap = new Map<
  ChannelStatus,
  ChannelStatus[]
>([
  [ChannelStatus.CREATED, [ChannelStatus.ACTIVE]],
  [ChannelStatus.ACTIVE, [ChannelStatus.PUBLISHED, ChannelStatus.RESTRICTED]],
]);

export class Channel extends Resource<ChannelStatus> {
  resourceType = ResourceType.CHANNEL;
  transitionMap = ChannelStatusTransitionMap;
  name!: string;
  slug!: string;
  whitelabel!: Whitelabel;
  // Media
  image256x256!: string;
  // Related
  playlists!: Partial<Playlist>[];
}
