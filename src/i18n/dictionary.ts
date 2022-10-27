import { Metadata, MetadataMap } from "../schema";
import { handlebars } from "hbs";

export class I18nDictionary {
  private metadataMap: MetadataMap<string>;

  constructor(readonly instanceI18nMetadata: Metadata<string>[]) {
    this.metadataMap = new MetadataMap(instanceI18nMetadata);
  }

  get(string: string, context?: string[]) {
    const text = this.metadataMap.get(string)?.value ?? string;
    if (!context) return text;
    const template = handlebars.compile(text);
    return template(context);
  }
}
