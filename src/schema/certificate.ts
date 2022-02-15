import { BaseEvent } from "./baseEvent";

export enum CertificateType {
  SAMPLE = "sample",
  PASSPORT = "passport",
  COURSE = "course",
  STAGE = "stage",
}

export class CertificateEvent extends BaseEvent {
  data!: {
    fileUrl: string;
    fileDocPath: string;
    publicUrl: string;
  };
}
