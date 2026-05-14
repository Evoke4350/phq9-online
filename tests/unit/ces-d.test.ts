import { describe, it, expect } from 'vitest';
import { cesd } from '$lib/screeners/ces-d';

describe('CES-D', () => {
  it('has 20 items, scale 0-3', () => {
    expect(cesd.itemCount).toBe(20);
    expect(cesd.scale.values).toEqual([0, 1, 2, 3]);
  });

  it('reverse-scores items 4, 8, 12, 16 (0-indexed: 3, 7, 11, 15)', () => {
    const reverseIdx = cesd.items.map((it, i) => (it.reverseScored ? i : -1)).filter((i) => i >= 0);
    expect(reverseIdx).toEqual([3, 7, 11, 15]);
  });

  it('sums with reverse for positively-worded items', () => {
    const allZero = Array(20).fill(0);
    expect(cesd.score(allZero)).toBe(3 * 4);
    const allThree = Array(20).fill(3);
    expect(cesd.score(allThree)).toBe(3 * 16 + 0 * 4);
  });

  it('cutoff 16 marks risk', () => {
    expect(cesd.bandFor(15).severity).toBe('none');
    expect(cesd.bandFor(16).severity).toBe('moderate');
  });
});
