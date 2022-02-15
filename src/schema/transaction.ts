import { BaseEvent } from "./baseEvent";
import { Provider, ProviderExtra } from "./provider";

export enum Asset {
  BRL = "fiat.brl",
  FTOKEN = "token.f",
}

export interface TransactionEvent extends BaseEvent {
  provider: Provider;
}
export interface Transaction {
  resourceId: string;
  type: TransactionType;
  asset: Asset;
  description: string;
  parent?: Transaction;
  userFrom: string;
  userTo: string;
  provider: Provider;
  providerExternalId: string;
  providerExtra: ProviderExtra[];
  productId: string;
  productType: ProductType;
  value: number;
  status: TransactionStatus;
}

export enum TransactionType {
  PURCHASE = "purchase",
  SUBSCRIPTION = "subscription",
  SPLIT = "split",
  P2P = "p2p",
  REFUND = "refund",
  WITHDRAW = "withdraw",
  DEPOSIT = "deposit",
}

export enum ProductType {
  PLATAFORM_SUBSCRIPTION = "plataform.subscription",
  CHANNEL_SUBSCRIPTION = "channel.subscription",
  COURSE_PURCHASE = "course.purchase",
}

export enum TransactionStatus {
  CREATED = "created",
  APPROVED = "approved",
  PROVIDER_USER_CREATED = "provider.user.created",
  PROVIDER_PAYMENT_CREATED = "provider.payment.created",
  PROVIDER_PAYMENT_PAID = "provider.payment.paid",
  PROVIDER_PAYMENT_FAILED = "provider.payment.failed",
  PAID = "paid",
  FAILED = "failed",
  CANCELED = "canceled",
  DELETED = "deleted",
}
