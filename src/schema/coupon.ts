import { Resource, ResourceType } from "./resource";
import { Transaction } from "./transaction";

export enum CouponStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
}

export const CouponTransitionMap = new Map<CouponStatus, CouponStatus[]>([
  [CouponStatus.CREATED, [CouponStatus.ACTIVE]],
  [CouponStatus.ACTIVE, [CouponStatus.UNAVALIABLE]],
]);

export class Coupon extends Resource<CouponStatus> {
  resourceType = ResourceType.COUPON;
  transitionMap = CouponTransitionMap;
  code!: string;
  quantity?: number;
  productId?: string;
  productType!:
    | ResourceType.PLATFORM
    | ResourceType.CHANNEL
    | ResourceType.COURSE;
  transactions?: Partial<Transaction>[];
  value?: number;
  percentage?: number;
}
