import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Playlist } from "./playlist";
import { Tag } from "./tag";

export enum PageStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const PageStatusTransitionMap = new Map<PageStatus, PageStatus[]>([
  [PageStatus.CREATED, [PageStatus.ACTIVE]],
]);

export class Page extends Resource implements SearchableResource {
  resourceType = ResourceType.PAGE;
  name!: string;
  url!: string;
  // Related
  playlists!: Pick<Playlist, "resourceId" | "name">[];
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource<any, ResourceStatus> {
    const data = resource as Page;
    return {
      resourceType: ResourceType.PAGE,
      resourceId: data.resourceId,
      h1: data.name,
      isPublic: data.isPublic,
      resourceUrl: resource.url,
      whitelabel: resource.whitelabel,
      status: ResourceStatus.CREATED,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}

export enum FLabelAppPagePath {
  ABOUT_US = "/about-us",
  CALENDAR = "/calendar",
  CERTIFICATE = "/certificate",
  CHANNEL = "/channel/:channelId",
  CHANNEL_CALENDAR = "/channel/:channelId/calendar",
  CHANNEL_COURSE = "/channel/:channelId/course/:courseId",
  CHANNEL_HOME = "/channel",
  CHANNEL_PLAYER = "/channel/:channelId/player/:contentId",
  CHANNEL_STAGE = "/channel/:channelId/stage/:slug",
  COMPANIES = "/companies",
  COURSE = "/course/:courseId",
  COURSE_CERTIFICATE = "/course/:courseId/certificate/:certificateId",
  DEVELOPERS = "/developers",
  EXAM = "/exam/:contentId",
  FLABEL = "/flabel",
  HOME = "/",
  LIBRARY = "/library",
  METAVERSO = "/metaverso",
  OPEN_REVOLUTION = "/open-revolution",
  PLAYER = "/player/:contentId",
  PREMIUM_COURSE = "/premium/:courseId",
  PREMIUM_HOME = "/premium",
  PROFILE = "/profile",
  SEARCH = "/search",
  SEARCH_RESULTS = "/search/:text",
  SLIDESHOW = "/slideshow/:contentId",
  STAGE = "/stage/:slug",
  TIMELINE = "/timeline",
  WAITING_ROOM = "/waiting-room",
  WALLET = "/wallet",
}

export function PageUrl(pagePath: string, args?: any) {
  if (!args) return pagePath;
  const keys = Object.keys(args);
  let url = "";
  for (const key of keys) {
    url = !!url
      ? url.replace(`:${key}`, args[key])
      : pagePath.replace(`:${key}`, args[key]);
  }
  return url;
}
