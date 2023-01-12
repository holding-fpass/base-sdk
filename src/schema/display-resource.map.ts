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
import { ResourceType } from "./resource";
import { Signature } from "./signature";
import { Stage } from "./stage";
import { Story } from "./story";
import { Subscription } from "./subscription";
import { Subtitle } from "./subtitle";
import { User } from "./user";
import { Video } from "./video";

export const DisplayResourceFunctionMap = new Map<ResourceType, Function>([
  [ResourceType.CAMPAIGN, Campaign.prototype.asDisplayResource],
  [ResourceType.CHANNEL, Channel.prototype.asDisplayResource],
  [ResourceType.CONTENT, Content.prototype.asDisplayResource],
  [ResourceType.CONTRACT, Contract.prototype.asDisplayResource],
  [ResourceType.CONTENT_ITEM, ContentItem.prototype.asDisplayResource],
  [ResourceType.COUPON, Coupon.prototype.asDisplayResource],
  [ResourceType.COURSE, Course.prototype.asDisplayResource],
  [ResourceType.DEVICE, Device.prototype.asDisplayResource],
  [ResourceType.FORM, Form.prototype.asDisplayResource],
  [ResourceType.INSTANCE, Instance.prototype.asDisplayResource],
  [ResourceType.MFA, Mfa.prototype.asDisplayResource],
  [ResourceType.MODULE, Module.prototype.asDisplayResource],
  [ResourceType.NOTIFICATION, Notification.prototype.asDisplayResource],
  [ResourceType.PLAN, Plan.asDisplayResource],
  [ResourceType.PLAYLIST, Playlist.prototype.asDisplayResource],
  [ResourceType.SIGNATURE, Signature.prototype.asDisplayResource],
  [ResourceType.STAGE, Stage.prototype.asDisplayResource],
  [ResourceType.STORY, Story.prototype.asDisplayResource],
  [ResourceType.SUBSCRIPTION, Subscription.asDisplayResource],
  [ResourceType.SUBTITLE, Subtitle.prototype.asDisplayResource],
  [ResourceType.USER, User.prototype.asDisplayResource],
  [ResourceType.VIDEO, Video.prototype.asDisplayResource],
]);
