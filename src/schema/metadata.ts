export interface Metadata {
  key: string;
  value: any;
  timestamp: string;
}

export class MetadataMap {
  private metadatas: Metadata[] = [];
  constructor(metadatas: Metadata[]) {
    this.metadatas = metadatas;
  }
  get(key: string) {
    return this.metadatas.find((value) => value.key === key);
  }
  set(key: string, value: any) {
    // Prepare
    const metadata = {
      key,
      value,
      timestamp: new Date().toISOString(),
    } as Metadata;
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
  getAll(): Metadata[] {
    return this.metadatas;
  }
}
