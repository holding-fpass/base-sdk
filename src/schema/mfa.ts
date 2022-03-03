import { Device } from "./device";
import { Resource } from "./resource";

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

export interface Mfa extends Resource<MfaStatus> {
  key: MfaKey;
  value: string;
  code: string;
  fingerprint?: string;
  //
  dateEnd: string;
  //
  device: Device;
}
