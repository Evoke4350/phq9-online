import { describe, it, expect } from 'vitest';
import { gad7 } from '$lib/screeners/gad-7';

describe('GAD-7', () => {
  it('has 7 items, scale 0-3', () => {
    expect(gad7.itemCount).toBe(7);
    expect(gad7.scale.values).toEqual([0, 1, 2, 3]);
  });

  it.each([
    [0, 'minimal'],
    [4, 'minimal'],
    [5, 'mild'],
    [9, 'mild'],
    [10, 'moderate'],
    [14, 'moderate'],
    [15, 'severe'],
    [21, 'severe']
  ])('score %i → %s', (score, severity) => {
    expect(gad7.bandFor(score).severity).toBe(severity);
  });
});
