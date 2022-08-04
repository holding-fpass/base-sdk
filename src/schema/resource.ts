import { Timestamp } from "firebase-admin/firestore";
import { Signature } from "./signature";
import { Whitelabel } from "./whitelabel";

export enum ResourceType {
  APIKEY = "apikey",
  CAMPAIGN = "campaign",
  CERTIFICATE = "certificate",
  CHANNEL = "channel",
  CHANNEL_IMAGE_AVATAR = "channel.image.avatar",
  CHANNEL_IMAGE_BANNER = "channel.image.banner",
  CHAT_FILE = "chat.file",
  CHAT_IMAGE = "chat.image",
  CHAT_MESSAGE = "chat.message",
  CONTENT = "content",
  CONTENT_ITEM = "content.item",
  CONTRACT = "contract",
  COUPON = "coupon",
  COURSE = "course",
  DEVICE = "device",
  FILE = "file",
  FORM = "form",
  FORM_RESPONSE = "form.response",
  IMMERSION = "immersion",
  INSTANCE = "instance",
  INTERACTION = "interaction",
  JWT = "jwt",
  LESSON = "lesson",
  LIVE = "live",
  MEASUREMENT = "measurement",
  MFA = "mfa",
  MODULE = "module",
  NOTIFICATION = "notification",
  PAGE = "page",
  PAGE_VIEW = "page.view",
  PLAN = "plan",
  PLATFORM = "platform",
  PLAYLIST = "playlist",
  SIGNATURE = "signature",
  STAGE = "stage",
  STAGE_CALENDAR_GROUP = "stage.calendar.group",
  STAGE_CALENDAR_ITEM = "stage.calendar.item",
  STAGE_PARTICIPANT = "stage.participant",
  STORY = "story",
  STORIES_STORY_IMAGE = "stories.story.image",
  STORIES_STORY_VIDEO = "stories.story.video",
  SUBSCRIPTION = "subscription",
  TAG = "tag",
  THREAD = "thread",
  TRANSACTION = "transaction",
  USER = "user",
  USER_CONSENT = "user.consent",
  USER_IMAGE_AVATAR = "user.image.avatar",
  USER_IMAGE_WEBCAM = "user.image.webcam",
  WALLET = "wallet",
  WALLET_FIAT = "wallet.fiat",
  WALLET_TOKEN = "wallet.token",
  WHITELABEL = "whitelabel",
}

export enum ResourceStatus {
  CREATED = "created",
}

export class Resource<Status = any> {
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
  transitionMap?: Map<Status, Status[]>;
  // Approval
  approvals?: Signature[];
}

export class DisplayResource extends Resource {
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
  open?: boolean;
  children?: DisplayResource[];
  parent?: DisplayResource;
  parentId?: string;
  parentType?: ResourceType;
  dateStart?: string;
  dateEnd?: string;
}
