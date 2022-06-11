import * as fileSystem from 'fs/promises';
import { handlebars } from 'hbs';

class HandlebarsProvider {
    public static async render<T = Record<string, unknown>>(filepath: string, context?: T): Promise<string> {
        const fileContent = await fileSystem.readFile(filepath, 'utf-8');
        const templateRender = handlebars.compile(fileContent);
        return templateRender(context);
    }
}

export { HandlebarsProvider };