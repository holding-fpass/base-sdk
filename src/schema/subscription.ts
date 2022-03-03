import { Contract } from "./contract";
import { ProviderExtra } from "./provider";
import { Resource } from "./resource";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";

export enum SubscriptionStatus {
  CREATED = "created",
  PROVIDER_SUBSCRIPTION_CREATED = "provider.subscription.created",
  ACTIVE = "active",
  PROVIDER_SUBSCRIPTION_CANCELED = "provider.subscription.canceled",
  CANCELED = "canceled",
  DELETED = "deleted",
}

export const SubscriptionStatusTransitionMap = new Map<
  SubscriptionStatus,
  SubscriptionStatus[]
>([
  [
    SubscriptionStatus.CREATED,
    [
      SubscriptionStatus.PROVIDER_SUBSCRIPTION_CREATED,
      SubscriptionStatus.DELETED,
    ],
  ],
  [
    SubscriptionStatus.PROVIDER_SUBSCRIPTION_CREATED,
    [SubscriptionStatus.ACTIVE],
  ],
  [
    SubscriptionStatus.ACTIVE,
    [SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED],
  ],
  [
    SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED,
    [SubscriptionStatus.CANCELED],
  ],
]);

export enum ProductType {
  PLATAFORM_SUBSCRIPTION = "plataform.subscription",
  CHANNEL_SUBSCRIPTION = "channel.subscription",
  COURSE_PURCHASE = "course.purchase",
}

export interface Subscription extends Resource<SubscriptionStatus> {
  // Plan
  productId: string;
  productType: ProductType;
  name: string;
  value: number;
  whitelabel: Whitelabel;
  contract: Contract;
  months: number;
  //
  dateStart: string;
  dateEnd: string;
  // Provider
  providerExtra: ProviderExtra[];
  //
  user: User;
}
