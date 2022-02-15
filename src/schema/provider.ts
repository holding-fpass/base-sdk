import { Metadata } from "./metadata";

export enum Provider {
  // Content
  FPASS = "fpass",
  OUROMODERNO = "ouromoderno",
  SPACENEEDLE = "spaceneedle",
  // Payment
  RECEBAFACIL = "recebafacil",
  BLITZPAY = "blitzpay",
  COGNA = "cogna",
}

export interface ProviderExtra extends Metadata {
  provider: Provider;
}

export class ProviderExtraMap {
  private provider: Provider;
  private extra: ProviderExtra[] = [];
  constructor(provider: Provider, extra: ProviderExtra[]) {
    this.provider = provider;
    this.extra = extra;
  }
  get(key: string) {
    return this.extra.find(
      (value) => value.provider == this.provider && value.key === key
    );
  }
  set(key: string, value: any) {
    const index = this.extra.findIndex(
      (value) => value.provider == this.provider && value.key === key
    );
    if (index === -1) return; // Not found
    this.extra[index] = {
      provider: this.provider,
      key,
      value,
      timestamp: new Date().toISOString(),
    } as ProviderExtra;
  }
  getAll(): ProviderExtra[] {
    return this.extra;
  }
}
