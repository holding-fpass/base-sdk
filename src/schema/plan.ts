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

export enum MonthFrequency {
  MONTHLY = 1,
  BIMONTHLY = 2,
  QUARTERLY = 3,
  SEMIANNUAL = 6,
  ANNUAL = 12,
} // In months

export class Plan extends Resource<PlanStatus> {
  resourceType = ResourceType.PLAN;
  transitionMap = PlanStatusTransitionMap;
  // Plan
  productId!: string;
  productType!: ResourceType.PLATFORM | ResourceType.PLAN;
  name!: string;
  value!: number;
  image128x128!: string;
  whitelabel!: Whitelabel;
  contract?: Partial<Contract>;
  months!: MonthFrequency;
  // Provider
  providerExtra?: ProviderExtra[];
}
