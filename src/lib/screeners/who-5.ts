import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 28, labelKey: 'who5_very_low', severity: 'severe', actionKey: 'who5_action_very_low' },
  { min: 29, max: 50, labelKey: 'who5_low', severity: 'mild', actionKey: 'who5_action_low' },
  { min: 51, max: 100, labelKey: 'who5_normal', severity: 'none', actionKey: 'who5_action_normal' }
];

export const who5: Screener = {
  id: 'who-5',
  slug: 'who-5',
  nameKey: 'who5_name',
  shortDescKey: 'who5_short_desc',
  domain: 'wellbeing',
  itemCount: 5,
  items: Array.from({ length: 5 }, (_, i) => ({ textKey: `who5_q${i + 1}` })),
  scale: {
    labelKeys: ['who5_scale_0','who5_scale_1','who5_scale_2','who5_scale_3','who5_scale_4','who5_scale_5'],
    values: [0, 1, 2, 3, 4, 5]
  },
  bands,
  source: {
    citation: 'World Health Organization. WHO (Five) Well-Being Index (1998 version). WHO Regional Office for Europe, Copenhagen.',
    url: 'https://www.psykiatri-regionh.dk/who-5/Pages/default.aspx',
    license: 'Free to use with attribution to WHO.',
    publicDomain: true,
    yearPublished: 1998
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0) * 4; },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
