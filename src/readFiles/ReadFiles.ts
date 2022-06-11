import * as fileSystem from 'fs/promises';
import * as YAML from 'yaml';

class ReadFiles {
    public static async fromYAML<T>(filepath: string): Promise<T> {
        const fileContent = await fileSystem.readFile(filepath, 'utf-8');
        return YAML.parse(fileContent) as T;
    }
}

export { ReadFiles };