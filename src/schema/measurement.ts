import { WhereFilterOp } from "firebase-admin/firestore";
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

export interface MeasurementFilterValues {
  key: string;
  operator: WhereFilterOp;
  value: string;
}
export interface MeasurementFilter {
  userId: string;
  resourceId: string;
  resourceType: ResourceType;
  resourceValues: MeasurementFilterValues[];
  dateStart: string;
  dateEnd: string;
}
export class Measurement extends Resource<MeasurementStatus> {
  resourceType = ResourceType.MEASUREMENT;
  transitionMap = MeasurementStatusTransitionMap;
  //
  type!: MeasurementType;
  filter!: Partial<MeasurementFilter>;
  filterHash!: string;
  user!: Partial<User>;
  value!: string;
  // Provider
  providerExtra?: ProviderExtra[];
}
