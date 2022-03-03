import { Playlist } from "./playlist";
import { Resource } from "./resource";
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

export interface Channel extends Resource<ChannelStatus> {
  name: string;
  slug: string;
  whitelabel: Whitelabel;
  // Media
  image256x256: string;
  //
  playlists: Playlist[];
}
