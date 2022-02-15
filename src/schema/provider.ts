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

export interface ProviderExtra {
  provider: Provider;
  key: string;
  value: any;
  timestamp: string;
}

export class ProviderExtraMap {
  private extra: ProviderExtra[] = [];
  constructor(provider: Provider, extra: ProviderExtra[]) {
    this.extra = extra.filter((value) => value.provider === provider);
  }
  get(key: string) {
    return this.extra.find((value) => value.key === key);
  }
}
