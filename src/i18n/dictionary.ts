import { Metadata, MetadataMap } from "../schema";

export class I18nDictionary {
  private metadataMap: MetadataMap<string>;

  constructor(readonly instanceI18nMetadata: Metadata<string>[]) {
    this.metadataMap = new MetadataMap(instanceI18nMetadata);
  }

  get(string: string) {
    return this.metadataMap.get(string)?.value ?? string;
  }
}
