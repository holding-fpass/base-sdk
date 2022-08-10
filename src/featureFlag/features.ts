import { Metadata, MetadataMap } from "../schema";

export class FeatureFlag {
  private metadataMap: MetadataMap<string>;

  constructor(readonly featuresMetadata: Metadata<string>[]) {
    this.metadataMap = new MetadataMap(featuresMetadata);
  }

  isEnabled(string: string) {
    return Boolean(this.metadataMap.get(string)?.value);
  }
}
