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
  value: string;
  timestamp: string;
}
