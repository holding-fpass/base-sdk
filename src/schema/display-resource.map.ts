import { Content, ContentItem, Course, Module } from "./course";

import { Campaign } from "./campaign";
import { Channel } from "./channel";
import { Contract } from "./contract";
import { Coupon } from "./coupon";
import { Device } from "./device";
import { Form, FormResponse } from "./form";
import { Instance } from "./instance";
import { Mfa } from "./mfa";
import { Notification } from "./notification";
import { Plan } from "./plan";
import { Playlist } from "./playlist";
import { DisplayResource, Resource, ResourceType } from "./resource";
import { Signature } from "./signature";
import { Stage } from "./stage";
import { Story } from "./story";
import { Subscription } from "./subscription";
import { Subtitle } from "./subtitle";
import { User } from "./user";
import { Video } from "./video";
import { Interaction } from "./interaction";
import { Certificate } from "./certificate";
import { Measurement } from "./measurement";
import { Reaction } from "./reaction";
import { Thread } from "./thread";

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

// @ts-ignore
export const ResourceTypePrototypeMap = new Map<ResourceType, Resource>([
  [ResourceType.CAMPAIGN, Campaign.prototype],
  [ResourceType.CERTIFICATE, Certificate.prototype],
  [ResourceType.CHANNEL, Channel.prototype],
  [ResourceType.CONTENT, Content.prototype],
  [ResourceType.CONTRACT, Contract.prototype],
  [ResourceType.COUPON, Coupon.prototype],
  [ResourceType.COURSE, Course.prototype],
  [ResourceType.FORM_RESPONSE, FormResponse.prototype],
  [ResourceType.INSTANCE, Instance.prototype],
  [ResourceType.MEASUREMENT, Measurement.prototype],
  [ResourceType.NOTIFICATION, Notification.prototype],
  [ResourceType.PLAN, Plan.prototype],
  [ResourceType.PLAYLIST, Playlist.prototype],
  [ResourceType.REACTION, Reaction.prototype],
  [ResourceType.STAGE, Stage.prototype],
  [ResourceType.STORY, Story.prototype],
  [ResourceType.SUBSCRIPTION, Subscription.prototype],
  [ResourceType.SUBTITLE, Subtitle.prototype],
  [ResourceType.THREAD, Thread.prototype],
  [ResourceType.USER, User.prototype],
]);