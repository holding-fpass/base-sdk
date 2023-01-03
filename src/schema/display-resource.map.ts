import { Channel } from "./channel";
import { Content, ContentItem, Course, Module } from "./course";
import { Stage } from "./stage";
import { Story } from "./story";
import { Device } from "./device";
import { Form } from "./form";
import { Contract } from "./contract";
import { Playlist } from "./playlist";
import { Subscription } from "./subscription";
import { Plan } from "./plan";
import { Tag } from "./tag";
import { User } from "./user";
import { ResourceType } from "./resource";
import { Notification } from "./notification";
import { Signature } from "./signature";

export const DisplayResourceFunctionMap = new Map<ResourceType, Function>([
  [ResourceType.CHANNEL, Channel.prototype.asDisplayResource],
  [ResourceType.CONTENT, Content.prototype.asDisplayResource],
  [ResourceType.STAGE, Stage.prototype.asDisplayResource],
  [ResourceType.USER, User.prototype.asDisplayResource],
  [ResourceType.TAG, Tag.prototype.asDisplayResource],
  [ResourceType.SUBSCRIPTION, Subscription.prototype.asDisplayResource],
  [ResourceType.PLAN, Plan.prototype.asDisplayResource],
  [ResourceType.FORM, Form.prototype.asDisplayResource],
  [ResourceType.STORY, Form.prototype.asDisplayResource],
  [ResourceType.PLAYLIST, Playlist.prototype.asDisplayResource],
  [ResourceType.CONTRACT, Contract.prototype.asDisplayResource],
  [ResourceType.STORY, Story.prototype.asDisplayResource],
  [ResourceType.DEVICE, Device.prototype.asDisplayResource],
  [ResourceType.NOTIFICATION, Notification.prototype.asDisplayResource],
  [ResourceType.SIGNATURE, Signature.prototype.asDisplayResource],
  [ResourceType.CONTENT_ITEM, ContentItem.prototype.asDisplayResource],
  [ResourceType.COURSE, Course.prototype.asDisplayResource],
  [ResourceType.MODULE, Module.prototype.asDisplayResource],
]);
