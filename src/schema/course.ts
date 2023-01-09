import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Channel } from "./channel";
import { Contract } from "./contract";
import { Form } from "./form";
import { Stage } from "./stage";
import { Subtitle } from "./subtitle";
import { Tag } from "./tag";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";
import { ImageUtils } from "../media";
import { ProviderExtra } from "./provider";

// Content

export enum ContentItemType {
  DOWNLOAD = "download",
  LINK = "link",
}
export class ContentItem extends Resource {
  resourceType = ResourceType.CONTENT_ITEM;
  type!: ContentItemType;
  name?: string;
  // Media
  resourceUrl?: string;
  fileUrl?: string;
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as ContentItem;
    return {
      resourceType: ResourceType.CONTENT_ITEM,
      resourceId: data.resourceId,
      h1: data.name,
    };
  }
}

export class ContentForms {
  contentEndForm?: Partial<Form>;
  userTestForm?: Partial<Form>;
}

export enum ContentType {
  VIDEO = "video",
  MEET = "meet",
  LIVE = "live",
  LINK = "link",
}

export enum ContentStatus {
  CREATED = "created",
  PROVIDER_TRANSCODE_JOB_CREATED = "provider.transcode.job.created",
  PROVIDER_TRANSCODE_JOB_SUCCEEDED = "provider.transcode.job.succeeded",
  PROVIDER_TRANSCODE_JOB_FAILED = "provider.transcode.job.failed",
  ACTIVE = "active",
}

export enum ContentProviderTranscodeMetadata {
  JOB_ID = "content.provider.transcode.metadata.job.id",
  STATUS = "content.provider.transcode.metadata.status",
  CREATE_TIME = "content.provider.transcode.metadata.create.time",
  START_TIME = "content.provider.transcode.metadata.start.time",
  END_TIME = "content.provider.transcode.metadata.end.time",
  ERROR = "content.provider.transcode.metadata.error",
}

export const ContentStatusTransitionMap = new Map<
  ContentStatus,
  ContentStatus[]
>([
  [ContentStatus.CREATED, [ContentStatus.PROVIDER_TRANSCODE_JOB_CREATED]],
  [
    ContentStatus.PROVIDER_TRANSCODE_JOB_CREATED,
    [ContentStatus.PROVIDER_TRANSCODE_JOB_SUCCEEDED],
  ],
  [
    ContentStatus.PROVIDER_TRANSCODE_JOB_CREATED,
    [ContentStatus.PROVIDER_TRANSCODE_JOB_FAILED],
  ],
  [ContentStatus.PROVIDER_TRANSCODE_JOB_SUCCEEDED, [ContentStatus.ACTIVE]],
]);

export class Content
  extends Resource<ContentStatus>
  implements SearchableResource<Content>
{
  resourceType = ResourceType.CONTENT;
  transitionMap = ContentStatusTransitionMap;
  type!: ContentType;
  name!: string;
  slug?: string;
  description?: string;
  providerExtra?: ProviderExtra<ContentProviderTranscodeMetadata>[];
  // Media
  image144x80?: string;
  image1440x720?: string;
  // Videos
  video1920x1080?: string;
  video1920x1080_duration?: number;
  video1920x1080_subtitles?: Subtitle[];
  // Transcoded
  audio?: string;
  video640x360?: string;
  video1280x720?: string;
  // Transmission
  rtmpUrl?: string;
  meetUrl?: string;
  // Date
  dateStart?: string;
  dateEnd?: string;
  meetDateStart?: string;
  meetDateEnd?: string;
  // Forms
  forms?: Partial<ContentForms>;
  // Payment
  free?: boolean;
  // Related
  stage?: Pick<Stage, "resourceId" | "name" | "slug">;
  mentors?: Pick<User, "resourceId" | "name" | "email">[];
  tags?: Tag[];
  parentId!: string;
  parentType!: ResourceType;
  items?: Partial<ContentItem>[];
  // SearchableResource implementation
  isPublic = true;
  asDisplayResource(resource: Content): DisplayResource<ContentType> {
    return {
      resourceType: ResourceType.CONTENT,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: true,
      imageUrl: ImageUtils.imageOptimized(
        resource.image144x80 as string,
        "144x80"
      ),
      type: resource.type,
    };
  }
}

// Module
export class Module extends Resource {
  resourceType = ResourceType.MODULE;
  name!: string;
  description?: string;
  // Media
  image256x256?: string;
  // Related
  contents?: Partial<Content>[];
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Module;
    return {
      resourceType: ResourceType.MODULE,
      resourceId: data.resourceId,
      h1: data.name,
    };
  }
}

// Course

export enum CourseStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
}

interface FAQ {
  title: string;
  response: string;
}

interface Knowledge {
  image80x80?: string;
  title?: string;
  subtitle?: string;
  items?: KnowledgeItens[];
}

interface KnowledgeItens {
  id: string;
  description?: string;
}

export class CourseForms {
  feedbackForm?: Partial<Form>;
  certificateForm?: Partial<Form>;
  publicRatingForm?: Partial<Form>;
}

export const CourseStatusTransitionMap = new Map<CourseStatus, CourseStatus[]>([
  [CourseStatus.CREATED, [CourseStatus.ACTIVE]],
  [CourseStatus.ACTIVE, [CourseStatus.UNAVALIABLE]],
]);
export class Course
  extends Resource<CourseStatus>
  implements SearchableResource
{
  resourceType = ResourceType.COURSE;
  transitionMap = CourseStatusTransitionMap;
  resourceId!: string;
  name!: string;
  description?: string;
  slug?: string;
  premium?: boolean;
  hide?: boolean;
  spotlight?: boolean;
  // General
  whitelabel!: Whitelabel;
  tags?: Tag[];
  knowledge?: Knowledge[];
  producer?: User;
  channel?: Channel;
  contract?: Partial<Contract>;
  faq?: FAQ[];
  // Media
  image1272x203?: string;
  image128x128?: string;
  image1400x720?: string;
  image400x512?: string;
  // Dates
  dateStart?: string;
  dateEnd?: string;
  // Purchase
  value?: number;
  paymentStart?: string;
  paymentEnd?: string;
  // Related
  contents?: Partial<Content>[];
  modules?: Partial<Module>[];
  forms?: CourseForms;
  // SearchableResource implementation
  isPublic = true;
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Course;
    return {
      resourceType: ResourceType.COURSE,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status,
      isPublic: true,
      imageUrl: ImageUtils.imageOptimized(
        data.image400x512 as string,
        "400x512"
      ),
    };
  }
}
