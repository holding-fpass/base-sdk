import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Whitelabel } from "./whitelabel";

export enum ContractStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVAILABLE = "unavailable",
}

export const ContractStatusTransitionMap = new Map<
  ContractStatus,
  ContractStatus[]
>([
  [ContractStatus.CREATED, [ContractStatus.ACTIVE]],
  [ContractStatus.ACTIVE, [ContractStatus.UNAVAILABLE]],
]);

export enum ContractItemScopeKey {
  AFFILIATE = "affiliate",
  CUSTOM = "custom",
  MENTOR = "mentor",
  PRODUCER = "producer",
  PRODUCER_PER_MINUTE = "producer.per.minute",
  TAXES = "taxes",
  WHITELABEL = "whitelabel",
}

export enum ContractItemType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export interface ContractItem {
  scopeKey: ContractItemScopeKey;
  scopeValue: string;
  // Purchase
  type: ContractItemType;
  value: number;
}

export class Contract
  extends Resource<ContractStatus>
  implements SearchableResource {
  resourceType = ResourceType.CONTRACT;
  name!: string;
  whitelabel!: Whitelabel;
  items!: ContractItem[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Contract): DisplayResource<any, ContractStatus> {
    return {
      resourceType: ResourceType.CONTRACT,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: resource.isPublic,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
