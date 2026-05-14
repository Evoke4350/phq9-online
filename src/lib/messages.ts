import * as m from '$paraglide/messages';

export function t(key: string): string {
  const fn = (m as Record<string, () => string>)[key];
  if (!fn) {
    if (typeof console !== 'undefined') console.warn(`Missing message key: ${key}`);
    return key;
  }
  return fn();
}
