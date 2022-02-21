import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum ResourceType {
  APIKEY = "apikey",
  CERTIFICATE = "certificate",
  USER = "user",
  MFA = "mfa",
  INTERACTION = "interaction",
  FILE = "file",
  LESSON = "lesson",
  IMMERSION = "immersion",
  LIVE = "live",
  COURSE = "course",
  CONTENT_MATERIAL = "content.material",
  CHANNEL_IMAGE_AVATAR = "channel.image.avatar",
  CHANNEL_IMAGE_BANNER = "channel.image.banner",
  CHAT_MESSAGE = "chat.message",
  CHAT_IMAGE = "chat.image",
  CHAT_FILE = "chat.file",
  USER_CONSENT = "user.consent",
  USER_IMAGE_AVATAR = "user.image.avatar",
  USER_IMAGE_WEBCAM = "user.image.webcam",
  STAGE = "stage",
  STAGE_CALENDAR_GROUP = "stage.calendar.group",
  STAGE_CALENDAR_ITEM = "stage.calendar.item",
  STAGE_PARTICIPANT = "stage.participant",
  STORIES_STORY_IMAGE = "stories.story.image",
  STORIES_STORY_VIDEO = "stories.story.video",
  TRANSACTION = "transaction",
  THREAD = "thread",
  WALLET = "wallet",
  WALLET_FIAT = "wallet.fiat",
  WALLET_TOKEN = "wallet.token",
}

export class Resource {
  @ApiProperty()
  resourceId!: string;
  @ApiProperty()
  resourceType?: ResourceType;
  @ApiPropertyOptional()
  timestamp?: Date;
  @ApiPropertyOptional()
  createdAt?: Date;
  @ApiPropertyOptional()
  updatedAt?: Date;
  @ApiPropertyOptional()
  statusAt?: Date;
  @ApiPropertyOptional()
  deletedAt?: Date;
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
  timestamp?: Date;
  @ApiPropertyOptional()
  dateStart?: Date;
  @ApiPropertyOptional()
  dateEnd?: Date;
}
