import {
  Certificate,
  Channel,
  Contract,
  Coupon,
  Course,
  Form,
  Instance,
  Interaction,
  Mfa,
  Plan,
  ResourceType,
  Subscription,
  Tag,
  Transaction,
  User,
} from "../schema";
import { Measurement } from "./measurement";

export const ResourceStatusTransitionMap = new Map<
  ResourceType,
  Map<string, string[]>
>([
  // [ResourceType.CERTIFICATE, new Certificate().transitionMap],
  // [ResourceType.CHANNEL, new Channel().transitionMap],
  // [ResourceType.CONTRACT, new Contract().transitionMap],
  // [ResourceType.COUPON, new Coupon().transitionMap],
  // [ResourceType.COURSE, new Course().transitionMap],
  [ResourceType.FORM, new Form().transitionMap],
  // [ResourceType.INSTANCE, new Instance().transitionMap],
  // [ResourceType.INTERACTION, new Interaction().transitionMap],
  [ResourceType.MEASUREMENT, new Measurement().transitionMap],
  // [ResourceType.MFA, new Mfa().transitionMap],
  // [ResourceType.PLAN, new Plan().transitionMap],
  // [ResourceType.SUBSCRIPTION, new Subscription().transitionMap],
  // [ResourceType.TAG, new Tag().transitionMap],
  [ResourceType.TRANSACTION, new Transaction().transitionMap],
  // [ResourceType.USER, new User().transitionMap],
]);
