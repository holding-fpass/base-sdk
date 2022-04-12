import { Metadata } from "./metadata";
import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

export enum InstanceStatus {
  CREATED = "created",
  PROVIDER_CREATED = "provider.created",
  ACTIVE = "active",
  DELETED = "deleted",
}

export const InstanceStatusTransitionMap = new Map<
  InstanceStatus,
  InstanceStatus[]
>([
  [InstanceStatus.CREATED, [InstanceStatus.PROVIDER_CREATED]],
  [InstanceStatus.PROVIDER_CREATED, [InstanceStatus.ACTIVE]],
  [InstanceStatus.ACTIVE, [InstanceStatus.DELETED]],
]);

export class Instance extends Resource<InstanceStatus> {
  resourceType = ResourceType.INSTANCE;
  transitionMap = InstanceStatusTransitionMap;
  //
  name!: Whitelabel;
  description!: string;
  // Media
  image256x256?: string;
  image400x400?: string;
  //
  urls!: Metadata[];
  theme!: Metadata[];
  features!: Metadata[];
  // Provider
  providerExtra?: ProviderExtra[];
}

export enum InstanceFeatureFlags {
  COUPON = "coupon",
  CALENDAR = "calendar",
  CERTIFICATE = "certificate",
  LEARNING_ANALYTICS = "learning.analytics",
  COMMUNITY = "community",
}
