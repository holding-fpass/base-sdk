import { Resource, ResourceType } from "./resource";
import { Transaction } from "./transaction";

export enum CoupomStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
}

export const CoupomTransitionMap = new Map<CoupomStatus, CoupomStatus[]>([
  [CoupomStatus.CREATED, [CoupomStatus.ACTIVE]],
  [CoupomStatus.ACTIVE, [CoupomStatus.UNAVALIABLE]],
]);

export interface Coupom extends Resource<CoupomStatus> {
  code: string;
  quantity?: number;
  productId?: string;
  productType:
    | ResourceType.PLATFORM
    | ResourceType.CHANNEL
    | ResourceType.COURSE;
  transactions?: Partial<Transaction>[];
  value: number;
  percentage: number;
}
