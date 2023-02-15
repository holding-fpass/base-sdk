import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Metadata } from "./metadata";
import { UserPermission } from "./user";

export enum MfaType {
  EMAIL = "email",
  PHONE = "phone",
}

export class MfaExtra {
  fields?: Metadata[];

  permission?: UserPermission;
}

export enum MfaStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const MfaStatusTransitionMap = new Map<MfaStatus, MfaStatus[]>([
  [MfaStatus.CREATED, [MfaStatus.ACTIVE]],
]);

export class Mfa extends Resource<MfaStatus> implements SearchableResource {
  resourceType = ResourceType.MFA;
  transitionMap = MfaStatusTransitionMap;
  type!: MfaType;
  value!: string;
  code!: string;
  extra?: MfaExtra;
  fingerprint?: string;
  // Dates
  dateEnd?: string;
  // Related
  machineId!: string;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Mfa): DisplayResource {
    return {
      resourceType: ResourceType.CONTRACT,
      resourceId: resource.resourceId,
      h1: resource.code,
      status: resource.status,
      type: resource.type,
      isPublic: resource.isPublic,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
