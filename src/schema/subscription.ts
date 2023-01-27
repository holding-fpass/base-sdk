import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";
import { MonthFrequency, Plan } from "./plan";

import { Contract } from "./contract";
import { ProviderExtra } from "./provider";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";

export enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  CREATED = "created",
  DELETED = "deleted",
  REACTIVATED = 'reactivated',
  SUSPENDED = "suspended",
  PROVIDER_SUBSCRIPTION_CANCELED = "provider.subscription.canceled",
  PROVIDER_SUBSCRIPTION_CREATED = "provider.subscription.created",
  PROVIDER_SUBSCRIPTION_REACTIVATED = 'provider.subscription.reactivated',
  PROVIDER_SUBSCRIPTION_SUSPENDED = "provider.subscription.suspended",
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
    [
      SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED,
      SubscriptionStatus.PROVIDER_SUBSCRIPTION_SUSPENDED,
    ],
  ],
  [
    SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED,
    [SubscriptionStatus.CANCELED],
  ],
  [
    SubscriptionStatus.PROVIDER_SUBSCRIPTION_SUSPENDED,
    [SubscriptionStatus.SUSPENDED],
  ],
  [
    SubscriptionStatus.SUSPENDED,
    [SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED, SubscriptionStatus.PROVIDER_SUBSCRIPTION_REACTIVATED],
  ],
  [SubscriptionStatus.PROVIDER_SUBSCRIPTION_REACTIVATED, [SubscriptionStatus.REACTIVATED]],
  [SubscriptionStatus.REACTIVATED, [SubscriptionStatus.ACTIVE]],
]);

export enum ProductType {
  PLATAFORM_SUBSCRIPTION = "plataform.subscription",
  CHANNEL_SUBSCRIPTION = "channel.subscription",
  COURSE_PURCHASE = "course.purchase",
}

export class Subscription
  extends Resource<SubscriptionStatus>
  implements SearchableResource
{
  resourceType = ResourceType.SUBSCRIPTION;
  transitionMap = SubscriptionStatusTransitionMap;
  // Plan
  productId!: string;
  productType!: ResourceType.PLATFORM | ResourceType.CHANNEL;
  name!: string;
  image128x128!: string;
  value!: number;
  whitelabel!: Whitelabel;
  contract?: Partial<Contract>;
  months!: MonthFrequency;
  reason?: string;
  dryRun?: boolean;
  // Provider
  providerExtra?: ProviderExtra[];
  // Dates
  dateStart!: string;
  dateEnd?: string;
  // Related
  user!: Partial<User>;
  plan!: Pick<Plan, "resourceId" | "resourceType">;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Subscription): DisplayResource {
    const data = resource as Subscription;
    return {
      resourceType: ResourceType.SUBSCRIPTION,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status,
      isPublic: data.isPublic,
    };
  }
}
