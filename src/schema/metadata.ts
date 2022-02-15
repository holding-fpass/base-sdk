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
    const index = this.metadatas.findIndex((value) => value.key === key);
    if (index === -1) return; // Not found
    this.metadatas[index] = {
      key,
      value,
      timestamp: new Date().toISOString(),
    } as Metadata;
  }
  getAll(): Metadata[] {
    return this.metadatas;
  }
}
