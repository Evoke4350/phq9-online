import { describe, it, expect } from 'vitest';
import { wsas } from '$lib/screeners/wsas';

describe('WSAS', () => {
  it('has 5 items, scale 0-8', () => {
    expect(wsas.itemCount).toBe(5);
    expect(wsas.scale.values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it.each([
    [0, 'none'],
    [9, 'mild'],
    [10, 'moderate'],
    [19, 'moderate'],
    [20, 'severe'],
    [40, 'severe']
  ])('score %i → %s', (score, severity) => {
    expect(wsas.bandFor(score).severity).toBe(severity);
  });
});
