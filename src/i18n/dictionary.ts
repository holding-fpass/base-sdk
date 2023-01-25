import { Metadata, MetadataMap } from "../schema";
import * as Mustache from "mustache";

export class I18nDictionary {
  private metadataMap: MetadataMap<string>;

  constructor(readonly instanceI18nMetadata: Metadata<string>[]) {
    this.metadataMap = new MetadataMap(instanceI18nMetadata);
  }

  get(string: string, context?: { [key: string]: string }) {
    const text = this.metadataMap.get(string)?.value ?? string;
    if (!context) return text;
    return Mustache.render(text, context);
  }
}
