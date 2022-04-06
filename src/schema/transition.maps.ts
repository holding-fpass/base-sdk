import {
  Certificate,
  Channel,
  Contract,
  Coupon,
  Course,
  Form,
  Instance,
  Mfa,
  Plan,
  ResourceType,
  Subscription,
  Transaction,
  User,
} from "../schema";

export const ResourceStatusTransitionMap = new Map<
  ResourceType,
  Map<string, string[]>
>([
  [ResourceType.CERTIFICATE, new Certificate().transitionMap],
  [ResourceType.CHANNEL, new Channel().transitionMap],
  [ResourceType.CONTRACT, new Contract().transitionMap],
  [ResourceType.COUPON, new Coupon().transitionMap],
  [ResourceType.COURSE, new Course().transitionMap],
  [ResourceType.FORM, new Form().transitionMap],
  [ResourceType.INSTACE, new Instance().transitionMap],
  [ResourceType.MFA, new Mfa().transitionMap],
  [ResourceType.PLAN, new Plan().transitionMap],
  [ResourceType.SUBSCRIPTION, new Subscription().transitionMap],
  [ResourceType.TRANSACTION, new Transaction().transitionMap],
  [ResourceType.USER, new User().transitionMap],
]);
