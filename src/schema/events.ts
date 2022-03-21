import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { ResourceType } from "./resource";

export enum EventType {
  // GenericEventCreated = "generic.created",
  // DataEventCreated = "data-event.created",
  EmailCreated = "email.created",
  // MFACreated = "mfa.created",
  // MFAVerified = "mfa.verified",
  // ClaimCreated = "claim.created",
  // ClaimAuthorized = "claim.authorized",
  VIDEO_CREATED = "video.created",
  VIDEO_AUDIO_CREATED = "video.audio.created",
  VIDEO_SUBTITLE_CREATED = "video.subtitle.created",
  VIDEO_SUBTITLE_REQUESTED = "video.subtitle.requested",
  WEBHOOK_OUTGOING_CREATED = "webhook.outgoing.created",
}

export enum InteractionTypes {
  LIVE_VIEW_CREATED = "live.view.created",
  LIVE_REACTION_CREATED = "live.reaction.created",
  LIVE_CERTIFICATE_CREATED = "live.certificate.created",
  LIVE_CHAT_MESSAGE_CREATED = "live.chat.message.created",
  LIVE_CHAT_MESSAGE_REPLY_CREATED = "live.chat.message.reply.created",
  LIVE_CHAT_MESSAGE_REACTION_CREATED = "live.chat.message.reply.created",
  LIVE_PLAYER_FULLSCREEN_CLICK = "live.player.fullscreen.click",
  LIVE_PLAYER_REACTION_CLICK = "live.player.reaction.click",
  LIVE_PLAYER_REACTION_CREATED = "live.player.reaction.created",
  // User
  USER_WEBSITE_LOGOUT_CLICK = "user.website.logout.click",
  USER_WEBSITE_HELP_CLICK = "user.website.help.click",
}

export interface SlimEvent {
  id: string;
  date: string;
}

export interface BaseEventOptions {
  eventType: EventType | string;
  resourceId?: string;
  resourceType?: ResourceType | string;
  parentId?: string;
  parentType?: ResourceType | string;
  data?: any;
  ownerId?: string;
  ownerExternalId?: string;
  whitelabel?: string;
}
export class BaseEvent<Data = any> {
  @ApiProperty()
  public eventId: string = uuidv4();
  @ApiProperty()
  public eventDate: string = new Date().toISOString();
  @ApiProperty()
  public eventType: EventType | string;
  @ApiPropertyOptional()
  public resourceId?: string;
  @ApiPropertyOptional()
  public resourceType?: ResourceType | string;
  @ApiPropertyOptional()
  public parentId?: string;
  @ApiPropertyOptional()
  public parentType?: ResourceType | string;
  @ApiPropertyOptional()
  public data?: Data;
  @ApiPropertyOptional()
  public ownerId?: string;
  @ApiPropertyOptional()
  public ownerExternalId?: string;
  @ApiPropertyOptional()
  public whitelabel?: string;

  constructor(options: BaseEventOptions) {
    this.eventType = options.eventType ?? undefined;
    this.resourceId = options.resourceId ?? undefined;
    this.resourceType = options.resourceType ?? undefined;
    this.parentId = options.parentId ?? undefined;
    this.parentType = options.parentType ?? undefined;
    this.data = options.data ?? undefined;
    this.ownerId = options.ownerId ?? undefined;
    this.ownerExternalId = options.ownerExternalId ?? undefined;
    this.whitelabel = options.whitelabel ?? undefined;
  }

  asSlimEvent(): SlimEvent {
    return {
      id: this.eventId,
      date: this.eventDate,
    };
  }
}
