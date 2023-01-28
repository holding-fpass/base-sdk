import { Metadata, MetadataMap } from "../schema";
import * as Mustache from "mustache";

export class I18nDictionary {
  private metadataMap: MetadataMap<string>;
  /**
   * Laguange code
   * Example: es | ptBr | enUs
   */
  readonly lang: string;

  constructor(readonly instanceI18nMetadata: Metadata<string>[], lang: string) {
    this.metadataMap = new MetadataMap(instanceI18nMetadata);
    this.lang = lang;
  }

  /**
   * Get translation based on actual dictionary
   * @param string String to search. Ex.: "Home"
   * @param context Parameters to build a complex string. Ex.: For a string "Hello {{name}}", context should be { "name": "Silva" }
   * @returns string
   */
  get(string: string, context?: { [key: string]: string }) {
    const text = this.metadataMap.get(string)?.value ?? string;
    if (!context) return text;
    return Mustache.render(text, context);
  }
}
