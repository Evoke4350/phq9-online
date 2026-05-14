import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { settings, adsSuppressed } from '$lib/stores';

type MockStorage = Storage & { _data: Record<string, string> };
beforeEach(() => {
  globalThis.localStorage = {
    _data: {} as Record<string, string>,
    getItem(k: string) { return (this as unknown as MockStorage)._data[k] ?? null; },
    setItem(k: string, v: string) { (this as unknown as MockStorage)._data[k] = v; },
    removeItem(k: string) { delete (this as unknown as MockStorage)._data[k]; },
    clear() { (this as unknown as MockStorage)._data = {}; },
    key() { return null; },
    length: 0
  } as unknown as Storage;
});

describe('stores', () => {
  it('settings defaults: saveHistory false, theme auto', () => {
    const s = get(settings);
    expect(s.saveHistory).toBe(false);
    expect(s.theme).toBe('auto');
  });

  it('adsSuppressed defaults false', () => {
    expect(get(adsSuppressed)).toBe(false);
  });

  it('settings persists to localStorage', () => {
    settings.update((s) => ({ ...s, saveHistory: true }));
    const raw = localStorage.getItem('phq9-online:settings:v1');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).saveHistory).toBe(true);
  });
});
