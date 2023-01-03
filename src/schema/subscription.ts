import { Contract } from "./contract";
import { MonthFrequency, Plan } from './plan';
import { ProviderExtra } from "./provider";
import { Resource, ResourceType, DisplayResource } from "./resource";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";

export enum SubscriptionStatus {
  CREATED = "created",
  PROVIDER_SUBSCRIPTION_CREATED = "provider.subscription.created",
  ACTIVE = "active",
  PROVIDER_SUBSCRIPTION_CANCELED = "provider.subscription.canceled",
  CANCELED = "canceled",
  PROVIDER_SUBSCRIPTION_SUSPENDED = 'provider.subscription.suspended',
  SUSPENDED = 'suspended',
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
    [SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED, SubscriptionStatus.PROVIDER_SUBSCRIPTION_SUSPENDED],
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
    [SubscriptionStatus.PROVIDER_SUBSCRIPTION_CANCELED],
  ]
]);

export enum ProductType {
  PLATAFORM_SUBSCRIPTION = "plataform.subscription",
  CHANNEL_SUBSCRIPTION = "channel.subscription",
  COURSE_PURCHASE = "course.purchase",
}

export class Subscription extends Resource<SubscriptionStatus> {
  resourceType = ResourceType.SUBSCRIPTION;
  transitionMap = SubscriptionStatusTransitionMap;
  // Plan
  productId!: string;
  productType!: ResourceType.PLATFORM | ResourceType.CHANNEL;
  name!: string;
  value!: number;
  whitelabel!: Whitelabel;
  contract?: Partial<Contract>;
  months!: MonthFrequency;
  reason?: string;
  // Provider
  providerExtra?: ProviderExtra[];
  // Dates
  dateStart!: string;
  dateEnd?: string;
  // Related
  user!: Partial<User>;
  plan!: Pick<Plan, "resourceId" | "resourceType">;
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Subscription;
    return {
      resourceType: ResourceType.SUBSCRIPTION,
      resourceId: data.resourceId,
      h1: data.name,
    };
  }
}
