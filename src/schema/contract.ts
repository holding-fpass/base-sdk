import { Resource, ResourceType, DisplayResource } from "./resource";
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
  PRODUCER_PER_MINUTE = 'producer.per.minute',
  TAXES = 'taxes',
  WHITELABEL = "whitelabel",
}

export enum ContractItemType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export interface ContractItem {
  scopeKey: ContractItemScopeKey;
  scopeValue: string;
  // Purchase
  type: ContractItemType;
  value: number;
}

export class Contract extends Resource<ContractStatus> {
  resourceType = ResourceType.CONTRACT;
  transitionMap = ContractStatusTransitionMap;
  name!: string;
  whitelabel!: Whitelabel;
  items!: ContractItem[];
  // SearchableResource implementation
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Contract;
    return {
      resourceType: ResourceType.CONTRACT,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status
    };
  }
}
