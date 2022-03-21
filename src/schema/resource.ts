import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum ResourceType {
  APIKEY = "apikey",
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
  IMMERSION = "immersion",
  INTERACTION = "interaction",
  JWT = "jwt",
  LESSON = "lesson",
  LIVE = "live",
  MFA = "mfa",
  PAGE_VIEW = "page.view",
  PLAN = "plan",
  PLATFORM = "platform",
  PLAYLIST = "playlist",
  STAGE = "stage",
  STAGE_CALENDAR_GROUP = "stage.calendar.group",
  STAGE_CALENDAR_ITEM = "stage.calendar.item",
  STAGE_PARTICIPANT = "stage.participant",
  STORIES_STORY_IMAGE = "stories.story.image",
  STORIES_STORY_VIDEO = "stories.story.video",
  SUBSCRIPTION = "subscription",
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
  @ApiProperty()
  resourceId!: string;
  @ApiProperty()
  resourceType?: ResourceType;
  // Dates
  @ApiPropertyOptional()
  timestamp?: string;
  @ApiPropertyOptional()
  createdAt?: string;
  @ApiPropertyOptional()
  updatedAt?: string;
  @ApiPropertyOptional()
  deletedAt?: string;
  // Status
  @ApiPropertyOptional()
  status?: Status;
  @ApiPropertyOptional()
  statusAt?: string;
  @ApiPropertyOptional()
  statusTo?: Status;
}

export class DisplayResource extends Resource {
  @ApiPropertyOptional()
  h1?: string;
  @ApiPropertyOptional()
  h2?: string;
  @ApiPropertyOptional()
  h3?: string;
  @ApiPropertyOptional()
  h4?: string;
  @ApiPropertyOptional()
  percentage?: number;
  @ApiPropertyOptional()
  imageUrl?: string;
  @ApiPropertyOptional()
  open?: boolean;
  @ApiPropertyOptional({ type: DisplayResource, isArray: true })
  children?: DisplayResource[];
  @ApiPropertyOptional({ type: DisplayResource })
  parent?: DisplayResource;
  @ApiPropertyOptional()
  parentId?: string;
  @ApiPropertyOptional()
  parentType?: ResourceType;
  @ApiPropertyOptional()
  dateStart?: string;
  @ApiPropertyOptional()
  dateEnd?: string;
}
