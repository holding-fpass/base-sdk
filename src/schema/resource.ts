import { Timestamp } from "firebase-admin/firestore";
import { Signature } from "./signature";
import { Whitelabel } from "./whitelabel";

export enum ResourceType {
  APIKEY = "apikey",
  QUESTION_DATABASE = 'question.database',
  CALENDAR_APPOINTMENT = "calendar.appointment",
  CAMPAIGN = "campaign",
  CERTIFICATE = "certificate",
  CHANNEL = "channel",
  CHANNELS = "channels",
  CHANNEL_IMAGE_AVATAR = "channel.image.avatar",
  CHANNEL_IMAGE_BANNER = "channel.image.banner",
  CHAT = "chat",
  CHAT_FILE = "chat.file",
  CHAT_IMAGE = "chat.image",
  CHAT_MESSAGE = "chat.message",
  CLASS = "class",
  CLASS_COURSE = "class.course",
  COMMENT = "comment",
  COMMUNITY = 'community',
  COMPLEMENTARY_MATERIAL = 'complementary.material',
  CONTENT = "content",
  CONTENT_ITEM = "content.item",
  CONTENT_SLIDESHOW = "content.slideshow",
  CONTRACT = "contract",
  COUPON = "coupon",
  COURSE = "course",
  DEVICE = "device",
  EMAIL = "email",
  EVENT = "event",
  FILE = "file",
  FORM = "form",
  FORM_RESPONSE = "form.response",
  FORUM = "forum",
  FORUM_POST = "forum.post",
  FORUM_TAG = "forum.tag",
  IMMERSION = "immersion",
  INSTANCE = "instance",
  INTERACTION = "interaction",
  JWT = "jwt",
  LESSON = "lesson",
  LIVE = "live",
  MEASUREMENT = "measurement",
  MESSAGES = "messages",
  MFA = "mfa",
  MODULE = "module",
  NOTIFICATION = "notification",
  NOTIFICATION_TEXT = "notification.text",
  PAGE = "page",
  PAGE_VIEW = "page.view",
  PLAN = "plan",
  PLATFORM = "platform",
  PLAYLIST = "playlist",
  POST = 'post',
  REACTION = "reaction",
  REACTION_METRICS = "reaction.metrics",
  REPORT = "report",
  SIGNATURE = "signature",
  STAGE = "stage",
  STAGE_CALENDAR_GROUP = "stage.calendar.group",
  STAGE_CALENDAR_ITEM = "stage.calendar.item",
  STAGE_PARTICIPANT = "stage.participant",
  STORIES_STORY_IMAGE = "stories.story.image",
  STORIES_STORY_VIDEO = "stories.story.video",
  STORY = "story",
  SUBSCRIPTION = "subscription",
  SUBTITLE = "subtitle",
  TAG = "tag",
  THREAD = "thread",
  TRANSACTION = "transaction",
  USER = "user",
  USER_CLASS = "user.class",
  USER_CLASS_COURSE = "user.class.course",
  USER_CONSENT = "user.consent",
  USER_EXAM = 'user.exam',
  USER_EXAM_ANSWER = 'user.exam.answer',
  USER_IMAGE_AVATAR = "user.image.avatar",
  USER_IMAGE_WEBCAM = "user.image.webcam",
  VIDEO = "video",
  WALLET = "wallet",
  WALLET_FIAT = "wallet.fiat",
  WALLET_TOKEN = "wallet.token",
  WHITELABEL = "whitelabel",
}

export enum ResourceStatus {
  CREATED = "created",
  ACTIVE = "active",
  APPROVED = "approved",
  CANCELED = "canceled",
  FAILED = "failed",
  PUBLISHED = "published",
  RESTRICTED = "restricted",
  DELETED = "deleted",
  UNAVALIABLE = "unavaliable",
  PROVIDER_CREATED = "provider.created",
  PROVIDER_EXECUTED = "provider.executed",
}

export class Resource<Status = any, Type = any> {
  resourceId!: string;
  resourceType?: ResourceType;
  whitelabel?: Whitelabel;
  // Dates
  timestamp?: string | Timestamp;
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
  deletedAt?: string | Timestamp;
  // Status
  status?: Status;
  statusAt?: string | Timestamp;
  statusTo?: Status;
  statusToError?: string;
  //
  type?: Type;
  // Responsability
  ownerId?: string;
  // Searchablility
  isSearchable?: boolean;
  // Approval
  approvals?: Signature[];
}

export abstract class SearchableResource {
  // If the resource should be filter to appear on Frontend Apps
  public isPublic!: boolean;
  // Base tranformation to all resource be storage on search service
  public static asDisplayResource<T>(resource: T): DisplayResource {
    throw new Error("Method not implemented.");
  }
}

export interface CacheResourse {
  /**
   * Object unique idetification
   */
  hash(): string;
  /**
   * String use to refer this resource on cache provider
   */
  cacheKey(): string;
  /**
   * Time in milliseconds
   */
  cacheTtl: number;
}

export class DisplayResource<Type = any, Status = ResourceStatus> extends Resource<Status, Type> {
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  percentage?: number;
  value?: number;
  cta?: string;
  ctaUrl?: string;
  slug?: string;
  imageUrl?: string;
  resourceUrl?: string;
  open?: boolean;
  readed?: boolean;
  children?: DisplayResource[];
  parent?: DisplayResource;
  parentId?: string;
  parentType?: ResourceType;
  referenceId?: string;
  referenceType?: ResourceType;
  dateStart?: string;
  dateEnd?: string;
  isPublic?: boolean;
}
