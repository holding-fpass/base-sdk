import { Resource, ResourceType, DisplayResource } from "./resource";
import { Transaction } from "./transaction";

export enum CouponStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
}

export const CouponStatusTransitionMap = new Map<CouponStatus, CouponStatus[]>([
  [CouponStatus.CREATED, [CouponStatus.ACTIVE]],
  [CouponStatus.ACTIVE, [CouponStatus.UNAVALIABLE]],
]);

export class Coupon extends Resource<CouponStatus> {
  resourceType = ResourceType.COUPON;
  transitionMap = CouponStatusTransitionMap;
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
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Coupon;
    return {
      resourceType: ResourceType.CONTRACT,
      resourceId: data.resourceId,
      h1: data.code,
      status: data.status,
    };
  }
}
