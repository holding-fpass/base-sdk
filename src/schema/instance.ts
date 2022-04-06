import { Metadata } from "./metadata";
import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

export enum InstaceStatus {
  CREATED = "created",
  PROVIDER_CREATED = "provider.created",
  ACTIVE = "active",
  DELETED = "deleted",
}

export const InstaceStatusTransitionMap = new Map<InstaceStatus, InstaceStatus[]>([
  [InstaceStatus.CREATED, [InstaceStatus.PROVIDER_CREATED]],
  [InstaceStatus.PROVIDER_CREATED, [InstaceStatus.ACTIVE]],
  [InstaceStatus.ACTIVE, [InstaceStatus.DELETED]],
]);

export class Instance extends Resource<InstaceStatus> {
  resourceType = ResourceType.INSTACE;
  transitionMap = InstaceStatusTransitionMap;
  // 
  name!: string;
  whitelabel!: Whitelabel;
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
