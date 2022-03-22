import { FieldValue } from "firebase-admin/firestore";

export enum WebhookEventDirection {
  INCOMING = "incoming",
  OUTGOING = "outgoing",
}

export interface WebhookEventOptions {
  url: string;
  delivered: boolean;
  deliveries?: WebhookEventDelivery[];
}

export interface WebhookEventDelivery {
  requestUrl: string;
  responseStatusCode: number;
  responseData?: any;
  footprint: string;
  timestamp?: any | FieldValue;
}

export interface WebhookEvent {
  resourceId: string;
  direction: WebhookEventDirection;
  payload: any;
  hash: string;
  options: WebhookEventOptions;
  timestamp: any | FieldValue;
  whitelabel?: string;
}

export interface WebhookEventResponse {
  eventId: string;
  message: string;
  delivered: boolean;
}
