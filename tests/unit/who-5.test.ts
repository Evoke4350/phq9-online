import { describe, it, expect } from 'vitest';
import { who5 } from '$lib/screeners/who-5';

describe('WHO-5', () => {
  it('has 5 items, scale 0-5', () => {
    expect(who5.itemCount).toBe(5);
    expect(who5.scale.values).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('raw score 0-25 multiplied by 4 → 0-100 percentage', () => {
    expect(who5.score([0, 0, 0, 0, 0])).toBe(0);
    expect(who5.score([5, 5, 5, 5, 5])).toBe(100);
    expect(who5.score([3, 3, 3, 3, 3])).toBe(60);
  });

  it.each([
    [0, 'severe'],
    [50, 'mild'],
    [51, 'none'],
    [100, 'none']
  ])('score %i → %s', (score, severity) => {
    expect(who5.bandFor(score).severity).toBe(severity);
  });
});
