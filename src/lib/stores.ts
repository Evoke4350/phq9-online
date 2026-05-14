import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Settings = {
  saveHistory: boolean;
  theme: 'auto' | 'light' | 'dark';
  locale: string;
};

const SETTINGS_KEY = 'phq9-online:settings:v1';
const defaults: Settings = { saveHistory: false, theme: 'auto', locale: 'en' };

const load = (): Settings => {
  if (!browser && !('localStorage' in globalThis)) return defaults;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
};

const persist = (s: Settings): void => {
  if (!('localStorage' in globalThis)) return;
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
};

const createSettings = (): Writable<Settings> => {
  const store = writable<Settings>(load());
  store.subscribe(persist);
  return store;
};

export const settings = createSettings();
export const adsSuppressed = writable<boolean>(false);
// Use __PUBLIC_ENABLE_ADS__ which is defined by vite.config.ts at build time.
// Falls back to false when the env var is not set.
declare const __PUBLIC_ENABLE_ADS__: string;
export const adsEnabled = writable<boolean>(
  typeof __PUBLIC_ENABLE_ADS__ !== 'undefined' && __PUBLIC_ENABLE_ADS__ === 'true'
);
