import { describe, it, expect } from 'vitest';
import { promisDepression } from '$lib/screeners/promis-depression';

describe('PROMIS Depression 8a', () => {
  it('has 8 items, scale 1-5 (never to always)', () => {
    expect(promisDepression.itemCount).toBe(8);
    expect(promisDepression.scale.values).toEqual([1, 2, 3, 4, 5]);
  });

  it('raw score is sum of 1-5 values, range 8-40', () => {
    expect(promisDepression.score([1, 1, 1, 1, 1, 1, 1, 1])).toBe(8);
    expect(promisDepression.score([5, 5, 5, 5, 5, 5, 5, 5])).toBe(40);
  });

  it('bands match published T-score-equivalent cutoffs', () => {
    expect(promisDepression.bandFor(8).severity).toBe('none');
    expect(promisDepression.bandFor(15).severity).toBe('mild');
    expect(promisDepression.bandFor(20).severity).toBe('moderate');
    expect(promisDepression.bandFor(30).severity).toBe('severe');
  });
});
