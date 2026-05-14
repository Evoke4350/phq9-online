import { describe, it, expect } from 'vitest';
import { phq9 } from '$lib/screeners/phq-9';

describe('PHQ-9', () => {
  it('has 9 items', () => {
    expect(phq9.itemCount).toBe(9);
    expect(phq9.items).toHaveLength(9);
  });

  it('sums answers', () => {
    expect(phq9.score([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(0);
    expect(phq9.score([3, 3, 3, 3, 3, 3, 3, 3, 3])).toBe(27);
    expect(phq9.score([1, 2, 0, 3, 1, 0, 2, 1, 0])).toBe(10);
  });

  it.each([
    [0, 'minimal'],
    [4, 'minimal'],
    [5, 'mild'],
    [9, 'mild'],
    [10, 'moderate'],
    [14, 'moderate'],
    [15, 'mod-severe'],
    [19, 'mod-severe'],
    [20, 'severe'],
    [27, 'severe']
  ])('score %i maps to severity %s', (score, severity) => {
    expect(phq9.bandFor(score).severity).toBe(severity);
  });

  it('flags when Q9 (index 8) is >= 1', () => {
    expect(phq9.flagFired([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(false);
    expect(phq9.flagFired([0, 0, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
    expect(phq9.flagFired([0, 0, 0, 0, 0, 0, 0, 0, 3])).toBe(true);
  });

  it('is public domain Pfizer instrument', () => {
    expect(phq9.source.publicDomain).toBe(true);
    expect(phq9.source.yearPublished).toBe(1999);
  });
});
