import { Content, ContentItem, Course, Module } from "./course";

import { Campaign } from "./campaign";
import { Channel } from "./channel";
import { Contract } from "./contract";
import { Coupon } from "./coupon";
import { Device } from "./device";
import { Form } from "./form";
import { Instance } from "./instance";
import { Mfa } from "./mfa";
import { Notification } from "./notification";
import { Plan } from "./plan";
import { Playlist } from "./playlist";
import { DisplayResource, ResourceType } from "./resource";
import { Signature } from "./signature";
import { Stage } from "./stage";
import { Story } from "./story";
import { Subscription } from "./subscription";
import { Subtitle } from "./subtitle";
import { User } from "./user";
import { Video } from "./video";
import { Interaction } from "./interaction";

export interface IDisplayResourceFunction extends Function {
  (resource: any): DisplayResource<any, any>;
}

export const DisplayResourceFunctionMap = new Map<
  ResourceType,
  IDisplayResourceFunction
>([
  [ResourceType.CAMPAIGN, Campaign.asDisplayResource],
  [ResourceType.CHANNEL, Channel.asDisplayResource],
  [ResourceType.CONTENT, Content.asDisplayResource],
  [ResourceType.CONTRACT, Contract.asDisplayResource],
  [ResourceType.CONTENT_ITEM, ContentItem.asDisplayResource],
  [ResourceType.COUPON, Coupon.asDisplayResource],
  [ResourceType.COURSE, Course.asDisplayResource],
  [ResourceType.DEVICE, Device.asDisplayResource],
  [ResourceType.FORM, Form.asDisplayResource],
  [ResourceType.INTERACTION, Interaction.asDisplayResource],
  [ResourceType.INSTANCE, Instance.asDisplayResource],
  [ResourceType.MFA, Mfa.asDisplayResource],
  [ResourceType.MODULE, Module.asDisplayResource],
  [ResourceType.NOTIFICATION, Notification.asDisplayResource],
  [ResourceType.PLAN, Plan.asDisplayResource],
  [ResourceType.PLAYLIST, Playlist.asDisplayResource],
  [ResourceType.SIGNATURE, Signature.asDisplayResource],
  [ResourceType.STAGE, Stage.asDisplayResource],
  [ResourceType.STORY, Story.asDisplayResource],
  [ResourceType.SUBSCRIPTION, Subscription.asDisplayResource],
  [ResourceType.SUBTITLE, Subtitle.asDisplayResource],
  [ResourceType.USER, User.asDisplayResource],
  [ResourceType.VIDEO, Video.prototype.asDisplayResource],
]);
