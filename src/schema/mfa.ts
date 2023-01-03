import { Metadata } from "./metadata";
import { Resource, ResourceType, DisplayResource } from "./resource";
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

export class Mfa extends Resource<MfaStatus> {
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
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Mfa;
    return {
      resourceType: ResourceType.CONTRACT,
      resourceId: data.resourceId,
      h1: data.code,
      status: data.status,
    };
  }
}
