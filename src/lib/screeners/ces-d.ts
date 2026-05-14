import type { Screener, SeverityBand } from './types';

const REVERSE = new Set([3, 7, 11, 15]);

const bands: SeverityBand[] = [
  {
    min: 0,
    max: 15,
    labelKey: 'cesd_negative',
    severity: 'none',
    actionKey: 'cesd_action_negative'
  },
  {
    min: 16,
    max: 60,
    labelKey: 'cesd_positive',
    severity: 'moderate',
    actionKey: 'cesd_action_positive'
  }
];

export const cesd: Screener = {
  id: 'ces-d',
  slug: 'ces-d',
  nameKey: 'cesd_name',
  shortDescKey: 'cesd_short_desc',
  domain: 'depression',
  itemCount: 20,
  items: Array.from({ length: 20 }, (_, i) => ({
    textKey: `cesd_q${i + 1}`,
    ...(REVERSE.has(i) ? { reverseScored: true } : {})
  })),
  scale: {
    labelKeys: ['cesd_scale_0', 'cesd_scale_1', 'cesd_scale_2', 'cesd_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  source: {
    citation:
      'Radloff LS. The CES-D Scale: A self-report depression scale for research in the general population. Appl Psychol Meas. 1977;1(3):385-401.',
    doi: '10.1177/014662167700100306',
    license: 'Public domain; developed at NIMH.',
    publicDomain: true,
    yearPublished: 1977
  },
  score(answers) {
    return answers.reduce((s, v, i) => s + (REVERSE.has(i) ? 3 - v : v), 0);
  },
  bandFor(score) {
    return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!;
  },
  flagFired() {
    return false;
  }
};
