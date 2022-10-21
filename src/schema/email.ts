import { Resource } from './resource';

export class Email<T = unknown> extends Resource {
  hash!: string;
  messageProvider = 'sendgrid';
  messageStatusCode!: number;
  payload!: T;
  processedAt!: Date;
  processedWithSuccess!: boolean;
}