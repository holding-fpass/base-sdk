import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

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

export class Coupon
  extends Resource<CouponStatus>
  implements SearchableResource {
  resourceType = ResourceType.COUPON;
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
  isPublic = false;
  public static asDisplayResource(resource: Coupon): DisplayResource<any, CouponStatus> {
    return {
      resourceType: ResourceType.COUPON,
      resourceId: resource.resourceId,
      h1: resource.code,
      status: resource.status,
      isPublic: resource.isPublic,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt
    };
  }
}
