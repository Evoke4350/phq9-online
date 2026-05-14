import { describe, it, expect } from 'vitest';
import { phq2 } from '$lib/screeners/phq-2';

describe('PHQ-2', () => {
  it('has 2 items, scale 0-3', () => {
    expect(phq2.itemCount).toBe(2);
    expect(phq2.scale.values).toEqual([0, 1, 2, 3]);
  });

  it('sums answers', () => {
    expect(phq2.score([0, 0])).toBe(0);
    expect(phq2.score([3, 3])).toBe(6);
    expect(phq2.score([2, 1])).toBe(3);
  });

  it('cutoff 3 separates negative from positive screen', () => {
    expect(phq2.bandFor(2).severity).toBe('none');
    expect(phq2.bandFor(3).severity).toBe('moderate');
    expect(phq2.bandFor(6).severity).toBe('moderate');
  });
});
