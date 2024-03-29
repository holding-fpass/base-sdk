import { Course } from "./course";
import { BaseEvent } from "./events";
import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export enum CertificateStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const CertificateStatusTransitionMap = new Map<
  CertificateStatus,
  CertificateStatus[]
>([[CertificateStatus.CREATED, [CertificateStatus.ACTIVE]]]);

export enum CertificateType {
  SAMPLE = "sample",
  PASSPORT = "passport",
  COURSE = "course",
  STAGE = "stage",
}
export class Certificate extends Resource<CertificateStatus, CertificateType> {
  resourceType = ResourceType.CERTIFICATE;
  product?: Pick<Course, "name" | "resourceId">;
  user!: Pick<User, "name" | "email" | "resourceId">;
  // Media
  image1000x1000?: string;
}

export interface CertificateEventData {
  fileUrl: string;
  fileDocPath: string;
  publicUrl: string;
}

export class CertificateEvent extends BaseEvent<CertificateEventData> { }
