export interface HashCacheAdapter {
  exists(path: string): Promise<boolean>;
  read(path: string): Promise<string>;
  write(path: string, data: string): Promise<void>;
}

export class FileHashCache {
  private path: string;

  constructor(private adapter: HashCacheAdapter, pluginDir: string) {
    this.path = `${pluginDir}/cache.json`;
  }

  async load(): Promise<Record<string, string>> {
    if (!(await this.adapter.exists(this.path))) {
      return {};
    }
    try {
      return JSON.parse(await this.adapter.read(this.path));
    } catch (e) {
      return {};
    }
  }

  async save(map: Record<string, string>): Promise<void> {
    await this.adapter.write(this.path, JSON.stringify(map));
  }
}
