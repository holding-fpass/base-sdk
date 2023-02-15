import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Contract } from "./contract";
import { ProviderExtra } from "./provider";
import { Whitelabel } from "./whitelabel";
import { ImageUtils } from "../media";

export enum PlanStatus {
  CREATED = "created",
  PROVIDER_PLAN_CREATED = "provider.plan.created",
  ACTIVE = "active",
  DELETED = "deleted",
}

export const PlanStatusTransitionMap = new Map<PlanStatus, PlanStatus[]>([
  [PlanStatus.CREATED, [PlanStatus.PROVIDER_PLAN_CREATED]],
  [PlanStatus.PROVIDER_PLAN_CREATED, [PlanStatus.ACTIVE]],
  [PlanStatus.ACTIVE, [PlanStatus.DELETED]],
]);

export enum MonthFrequency {
  MONTHLY = 1,
  BIMONTHLY = 2,
  QUARTERLY = 3,
  SEMIANNUAL = 6,
  ANNUAL = 12,
} // In months

export class Plan extends Resource<PlanStatus> implements SearchableResource {
  resourceType = ResourceType.PLAN;
  transitionMap = PlanStatusTransitionMap;
  // Plan
  productId!: string;
  productType!: ResourceType.PLATFORM | ResourceType.CHANNEL;
  name!: string;
  h1!: string;
  h2!: string;
  value!: number;
  image128x128!: string;
  whitelabel!: Whitelabel;
  contract?: Partial<Contract>;
  months!: MonthFrequency;
  utmId?: string;
  // Provider
  providerExtra?: ProviderExtra[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: any): DisplayResource {
    const data = resource as Plan;
    return {
      resourceType: ResourceType.PLAN,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status,
      isPublic: data.isPublic,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
      imageUrl: ImageUtils.imageOptimized(
        resource.image128x128 as string,
        "128x128"
      ),
    };
  }
}
