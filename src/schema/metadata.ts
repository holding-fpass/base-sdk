export interface Metadata<T = string> {
  key: T;
  value: any;
  timestamp: string;
}

export class MetadataMap<T = string> {
  private metadatas: Metadata<T>[] = [];
  constructor(metadatas?: Metadata<T>[]) {
    this.metadatas = metadatas ?? [];
  }
  get(key: T) {
    return this.metadatas.find((value) => value.key === key) as unknown as T;
  }
  set(key: T, value: any) {
    // Prepare
    const metadata = {
      key,
      value,
      timestamp: new Date().toISOString(),
    } as Metadata<T>;
    // Search
    const index = this.metadatas.findIndex((value) => value.key === key);
    if (index === -1) {
      // New
      this.metadatas.push(metadata);
      return;
    }
    // Update
    this.metadatas[index] = metadata;
  }
  getAll(): Metadata<T>[] {
    return this.metadatas;
  }
}
