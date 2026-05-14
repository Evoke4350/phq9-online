import { describe, it, expect } from 'vitest';
import { screeners, screenerById, screenerSlugs } from '$lib/screeners/registry';

describe('registry', () => {
  it('exposes all 7 launch screeners', () => {
    expect(screeners).toHaveLength(7);
  });

  it('has unique ids and slugs', () => {
    const ids = new Set(screeners.map((s) => s.id));
    const slugs = new Set(screeners.map((s) => s.slug));
    expect(ids.size).toBe(7);
    expect(slugs.size).toBe(7);
  });

  it('lookup by id', () => {
    expect(screenerById('phq-9')?.id).toBe('phq-9');
    expect(screenerById('does-not-exist')).toBeUndefined();
  });

  it('screenerSlugs lists every non-flagship slug', () => {
    expect(screenerSlugs).not.toContain('');
    expect(screenerSlugs).toContain('gad-7');
    expect(screenerSlugs).toHaveLength(6);
  });
});
