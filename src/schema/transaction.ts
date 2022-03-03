import { BaseEvent } from "./baseEvent";
import { Provider, ProviderExtra } from "./provider";

export enum Asset {
  BRL = "brl",
  FTOKEN = "ftoken",
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
  productDescription: string;
  value: number;
  status: TransactionStatus;
  dryRun: boolean;
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
  CANCELED = "canceled",
  PROVIDER_USER_CREATED = "provider.user.created",
  PROVIDER_PAYMENT_CREATED = "provider.payment.created",
  PROVIDER_PAYMENT_PAID = "provider.payment.paid",
  PROVIDER_PAYMENT_FAILED = "provider.payment.failed",
  PAID = "paid",
  FAILED = "failed",
  DELETED = "deleted",
}

export const TransactionStatusTransitionMap = new Map<
  TransactionStatus,
  TransactionStatus[]
>([
  [
    TransactionStatus.CREATED,
    [
      TransactionStatus.APPROVED,
      TransactionStatus.CANCELED,
      TransactionStatus.DELETED,
    ],
  ],
  [
    TransactionStatus.APPROVED,
    [
      TransactionStatus.PROVIDER_USER_CREATED,
      TransactionStatus.PAID,
      TransactionStatus.FAILED,
    ],
  ],
  [
    TransactionStatus.PROVIDER_USER_CREATED,
    [TransactionStatus.PROVIDER_PAYMENT_CREATED],
  ],
  [
    TransactionStatus.PROVIDER_PAYMENT_CREATED,
    [
      TransactionStatus.PROVIDER_PAYMENT_PAID,
      TransactionStatus.PROVIDER_PAYMENT_FAILED,
    ],
  ],
  [TransactionStatus.PROVIDER_PAYMENT_PAID, [TransactionStatus.PAID]],
  [TransactionStatus.PROVIDER_PAYMENT_FAILED, [TransactionStatus.FAILED]],
  [TransactionStatus.FAILED, [TransactionStatus.DELETED]],
  [TransactionStatus.CANCELED, [TransactionStatus.DELETED]],
]);
