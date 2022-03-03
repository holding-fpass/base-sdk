import { Contract } from "./contract";
import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

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

export interface Plan extends Resource<PlanStatus> {
  // Plan
  productId: string;
  productType: ResourceType.PLATFORM | ResourceType.PLAN;
  name: string;
  value: number;
  whitelabel: Whitelabel;
  contract: Contract;
  months: number;
  // Provider
  providerExtra: ProviderExtra[];
}
