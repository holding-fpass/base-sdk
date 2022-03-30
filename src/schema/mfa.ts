import { Device } from "./device";
import { Resource, ResourceType } from "./resource";

export enum MfaKey {
  EMAIL = "email",
  PHONE = "phone",
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
  key!: MfaKey;
  value!: string;
  code!: string;
  fingerprint?: string;
  // Dates
  dateEnd!: string;
  // Related
  device!: Device;
}
