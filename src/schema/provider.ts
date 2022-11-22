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
  // Auth
  HINODE = "hinode",
}

export interface ProviderExtra<T = string> extends Metadata<T> {
  provider: Provider;
}

export class ProviderExtraMap<T> {
  private provider: Provider;
  private extra: ProviderExtra<T>[] = [];
  constructor(provider: Provider, extra?: ProviderExtra<T>[]) {
    this.provider = provider;
    this.extra = extra ?? [];
  }
  get(key: T) {
    return this.extra.find(
      (value) => value.provider == this.provider && value.key === key
    );
  }
  set(key: T, value: any) {
    // Prepare
    const providerExtra = {
      provider: this.provider,
      key,
      value,
      timestamp: new Date().toISOString(),
    } as ProviderExtra<T>;
    // Search
    const index = this.extra.findIndex(
      (value) => value.provider == this.provider && value.key === key
    );
    if (index === -1) {
      // New
      this.extra.push(providerExtra);
      return;
    }
    // Update
    this.extra[index] = providerExtra;
  }
  getAll(): ProviderExtra<T>[] {
    return this.extra;
  }
}
