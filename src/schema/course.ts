import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Channel } from "./channel";
import { Contract } from "./contract";
import { Form } from "./form";
import { ImageUtils, VideoUtils } from "../media";
import { ProviderExtra } from "./provider";
import { Stage } from "./stage";
import { Subtitle } from "./subtitle";
import { Tag } from "./tag";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";

interface CourseCertificateSettings {
  minimumWatchTime: number;
}

// Content

export enum ContentItemType {
  DOWNLOAD = "download",
  LINK = "link",
}
export class ContentItem extends Resource<ResourceStatus, ContentItemType> {
  resourceType = ResourceType.CONTENT_ITEM;
  name?: string;
  // Media
  resourceUrl?: string;
  fileUrl?: string;
  // SearchableResource implementation
  public static asDisplayResource(resource: ContentItem): DisplayResource<any, ResourceStatus> {
    return {
      resourceType: ResourceType.CONTENT_ITEM,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: ResourceStatus.CREATED,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
      type: resource.type
    };
  }
}

export class ContentForms {
  contentEndForm?: Partial<Form>;
  userTestForm?: Partial<Form>;
}

export class ContentSchedule {
  dateStart?: string;
  dateEnd?: string;
  meetDateStart?: string;
  meetDateEnd?: string;
  channel!: Partial<Channel>
  resourceId!: string;
  meetUrl?: string;
  slug?: string;
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
    [
      ContentStatus.PROVIDER_TRANSCODE_JOB_SUCCEEDED,
      ContentStatus.PROVIDER_TRANSCODE_JOB_FAILED,
    ],
  ],
  [ContentStatus.PROVIDER_TRANSCODE_JOB_SUCCEEDED, [ContentStatus.ACTIVE]],
  [ContentStatus.PROVIDER_TRANSCODE_JOB_FAILED, [ContentStatus.CREATED]],
]);

export class Content
  extends Resource<ContentStatus, ContentType>
  implements SearchableResource {
  resourceType = ResourceType.CONTENT;
  name!: string;
  slug?: string;
  description?: string;
  schedule?: ContentSchedule[];
  providerExtra?: ProviderExtra<ContentProviderTranscodeMetadata>[];
  providerTranscoderExternalId?: string;
  // Media
  image144x80?: string;
  image1440x720?: string;
  // Videos
  video1920x1080?: string;
  video1920x1080_duration?: number;
  video1920x1080_subtitles?: Subtitle[];
  // Transcoded
  audio?: string;
  audioCodec?: "mp3" | "mp4";
  video640x360?: string;
  video1280x720?: string;
  // For download files of ContentType.LINK
  fileUrl?: string;
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
  public static asDisplayResource(
    resource: Content
  ): DisplayResource<ContentType, ContentStatus> {
    return {
      resourceId: resource.resourceId,
      resourceType: ResourceType.CONTENT,
      h1: resource.name,
      h2: resource?.mentors?.map((mentor) => mentor.name)?.join(", "),
      dateStart: resource?.dateStart,
      dateEnd: resource?.dateEnd,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      status: resource.status,
      imageUrl: ImageUtils.imageOptimized(
        resource.image144x80 as string,
        "144x80"
      ),
      resourceUrl: VideoUtils.getApiUrl(resource.video1920x1080),
      parentId: resource.parentId,
      parentType: resource.parentType,
      type: resource.type,
      isPublic: true,
      isSearchable: resource?.isSearchable,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt
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
  public static asDisplayResource(resource: Module): DisplayResource<any, ResourceStatus> {
    return {
      resourceType: ResourceType.MODULE,
      resourceId: resource.resourceId,
      h1: resource.name,
      whitelabel: resource.whitelabel,
      status: ResourceStatus.CREATED,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
      imageUrl: ImageUtils.imageOptimized(
        resource.image256x256 as string,
        "256x256"
      ),
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

export enum CourseType {
  FREE = "course.free",
  LIVE = "course.live",
  IMERSION = "course.immersion",
  HYBRID = "course.hybrid",
  CATALOG = "course.catalog",
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
  extends Resource<CourseStatus, CourseType>
  implements SearchableResource {
  resourceType = ResourceType.COURSE;
  resourceId!: string;
  name!: string;
  description?: string;
  slug?: string;
  premium?: boolean;
  hide?: boolean;
  spotlight?: boolean;
  // Certificate Generation
  certificate?: CourseCertificateSettings;
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
  isFree?: boolean;
  value?: number;
  paymentStart?: string;
  paymentEnd?: string;
  // Related
  contents?: Partial<Content>[];
  modules?: Partial<Module>[];
  forms?: CourseForms;
  // SearchableResource implementation
  isPublic = true;
  public static asDisplayResource(resource: Course): DisplayResource<CourseType, CourseStatus> {
    return {
      resourceId: resource.resourceId,
      resourceType: ResourceType.COURSE,
      h1: resource.name,
      h2: resource?.producer?.name,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      status: resource.status,
      imageUrl: ImageUtils.imageOptimized(
        resource.image400x512 as string,
        "400x512"
      ),
      isPublic: true,
      type: resource.type,
      isSearchable: resource?.isSearchable,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
