import { BaseEvent } from "./events";
import { Metadata } from "./metadata";
import { Provider, ProviderExtra } from "./provider";
import { Resource } from "./resource";
import { ProductType } from "./subscription";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";

export enum TransactionType {
  PURCHASE = "purchase",
  SUBSCRIPTION = "subscription",
  SPLIT = "split",
  P2P = "p2p",
  REFUND = "refund",
  WITHDRAW = "withdraw",
  DEPOSIT = "deposit",
}

export enum TransactionStatus {
  CREATED = "created",
  CANCELED = "canceled",
  APPROVED = "approved",
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
    [TransactionStatus.PROVIDER_USER_CREATED, TransactionStatus.PAID],
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

export enum Asset {
  BRL = "brl",
  FTOKEN = "ftoken",
}
export interface Transaction extends Resource<TransactionStatus> {
  type: TransactionType;
  description: string;
  asset: Asset;
  //
  whitelabel: Whitelabel;
  userFrom: Partial<User>;
  userTo: Partial<User>;
  //
  parent?: Partial<Transaction>;
  // Provider
  provider: Provider;
  providerExtra: ProviderExtra[];
  //
  productId: string;
  productType: ProductType;
  productDescription: string;
  productExtra: Metadata[];
  //
  value: number;
  dryRun: boolean;
}

export interface TransactionEvent extends BaseEvent {
  provider: Provider;
}
