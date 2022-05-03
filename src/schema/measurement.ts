import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export enum MeasurementType {
  PAGEVIEW_SUM = "pageview.sum",
  PAGEVIEW_MAX = "pageview.max",
  RESPONSE_AVG = "response.avg",
  RESPONSE_COUNT = "response.count",
}

export enum MeasurementStatus {
  CREATED = "created",
  PROVIDER_CREATED = "provider.created",
  PROVIDER_EXECUTED = "provider.executed",
  ACTIVE = "active",
  DELETED = "deleted",
}

export const MeasurementStatusTransitionMap = new Map<
  MeasurementStatus,
  MeasurementStatus[]
>([
  [MeasurementStatus.CREATED, [MeasurementStatus.PROVIDER_CREATED]],
  [MeasurementStatus.PROVIDER_CREATED, [MeasurementStatus.PROVIDER_EXECUTED]],
  [MeasurementStatus.PROVIDER_EXECUTED, [MeasurementStatus.ACTIVE]],
  [MeasurementStatus.ACTIVE, [MeasurementStatus.DELETED]],
]);

export class Measurement extends Resource<MeasurementStatus> {
  resourceType = ResourceType.MEASUREMENT;
  transitionMap = MeasurementStatusTransitionMap;
  //
  type!: MeasurementType;
  reference!: Partial<Resource>;
  user!: Partial<User>;
  value!: string;
  // Provider
  providerExtra?: ProviderExtra[];
}
