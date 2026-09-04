import { FileHashCache, HashCacheAdapter } from './FileHashCache';

function makeAdapter(
  initialFiles: Record<string, string> = {},
): HashCacheAdapter {
  const files = { ...initialFiles };
  return {
    exists: jest.fn(async (path: string) => path in files),
    read: jest.fn(async (path: string) => {
      if (!(path in files)) {
        throw new Error(`ENOENT: ${path}`);
      }
      return files[path];
    }),
    write: jest.fn(async (path: string, data: string) => {
      files[path] = data;
    }),
  };
}

describe('FileHashCache', () => {
  it('load() returns an empty object when the cache file does not exist', async () => {
    const adapter = makeAdapter();
    const cache = new FileHashCache(adapter, 'plugins/update-time-on-edit');

    const result = await cache.load();

    expect(result).toEqual({});
  });

  it('load() returns the parsed map when the cache file exists', async () => {
    const adapter = makeAdapter({
      'plugins/update-time-on-edit/cache.json': JSON.stringify({
        'notes/a.md': 'deadbeef',
      }),
    });
    const cache = new FileHashCache(adapter, 'plugins/update-time-on-edit');

    const result = await cache.load();

    expect(result).toEqual({ 'notes/a.md': 'deadbeef' });
  });

  it('load() returns an empty object when the cache file contains invalid JSON', async () => {
    const adapter = makeAdapter({
      'plugins/update-time-on-edit/cache.json': 'not json',
    });
    const cache = new FileHashCache(adapter, 'plugins/update-time-on-edit');

    const result = await cache.load();

    expect(result).toEqual({});
  });

  it('save() writes the JSON-stringified map to the cache path', async () => {
    const adapter = makeAdapter();
    const cache = new FileHashCache(adapter, 'plugins/update-time-on-edit');

    await cache.save({ 'notes/a.md': 'deadbeef' });

    expect(adapter.write).toHaveBeenCalledWith(
      'plugins/update-time-on-edit/cache.json',
      JSON.stringify({ 'notes/a.md': 'deadbeef' }),
    );
  });
});
