import { Channel } from "./channel";
import { Contract } from "./contract";
import { Form } from "./form";
import { Resource, ResourceType } from "./resource";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";

// Content

export enum ContentItemType {
  DOWNLOAD = "download",
  LINK = "link",
}
export class ContentItem extends Resource {
  resourceType = ResourceType.CONTENT_ITEM;
  type!: ContentItemType;
  name!: string;
  description?: string;
  // Media
  resourceUrl!: string;
  image50x50?: string;
}

export enum ContentType {
  VIDEO = "video",
  MEET = "meet",
  LIVE = "live",
}

export enum ContentStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const ContentStatusTransitionMap = new Map<
  ContentStatus,
  ContentStatus[]
>([[ContentStatus.CREATED, [ContentStatus.ACTIVE]]]);

export class Content extends Resource<ContentStatus> {
  resourceType = ResourceType.CONTENT;
  transitionMap = ContentStatusTransitionMap;
  type!: ContentType;
  name!: string;
  slug?: string;
  description?: string;
  // Media
  image144x80?: string;
  image1440x720?: string;
  video1920x1080?: string;
  // Related
  items?: Partial<ContentItem>[];
}

// Course

export interface Tag {
  name: string;
}

export enum CourseStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
}

export const CourseStatusTransitionMap = new Map<CourseStatus, CourseStatus[]>([
  [CourseStatus.CREATED, [CourseStatus.ACTIVE]],
  [CourseStatus.ACTIVE, [CourseStatus.UNAVALIABLE]],
]);
export class Course extends Resource<CourseStatus> {
  resourceType = ResourceType.COURSE;
  transitionMap = CourseStatusTransitionMap;
  name!: string;
  slug?: string;
  description?: string;
  //
  whitelabel!: Whitelabel;
  tags?: Tag[];
  producer?: User;
  channel?: Channel;
  contract?: Partial<Contract>;
  // Media
  image400x512?: string;
  image1272x203?: string;
  image1400x720?: string;
  // Dates
  dateStart?: string;
  dateEnd?: string;
  // Purchase
  value?: number;
  paymentStart?: string;
  paymentEnd?: string;
  // Related
  contents?: Partial<Content>[];
  evaluationForm?: Partial<Form>;
}
