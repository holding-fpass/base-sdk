export interface Metadata<T = string> {
  key: T;
  value: any;
  timestamp?: string;
}

export class MetadataMap<T = string> {
  private readonly metadata: Metadata<T>[] = [];
  constructor(metadata?: Metadata<T>[]) {
    this.metadata = metadata ?? [];
  }
  get(key: T): Metadata<T> | undefined {
    return this.metadata.find((value) => value.key === key);
  }
  set(key: T, value: any) {
    // Prepare
    const metadata = {
      key,
      value,
      timestamp: new Date().toISOString(),
    } as Metadata<T>;
    // Search
    const index = this.metadata.findIndex((value) => value.key === key);
    if (index === -1) {
      // New
      this.metadata.push(metadata);
      return;
    }
    // Update
    this.metadata[index] = metadata;
  }
  getAll(): Metadata<T>[] {
    return this.metadata;
  }
  toObject(): Record<string, unknown> {
    return this.metadata.reduce((obj, metadata) => {
      obj[metadata.key as unknown as string] = metadata.value;
      return obj;
    }, {} as Record<string, unknown>);
  }
}
