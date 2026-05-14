import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 2, labelKey: 'phq2_negative', severity: 'none', actionKey: 'phq2_action_negative' },
  { min: 3, max: 6, labelKey: 'phq2_positive', severity: 'moderate', actionKey: 'phq2_action_positive' }
];

export const phq2: Screener = {
  id: 'phq-2',
  slug: 'phq-2',
  nameKey: 'phq2_name',
  shortDescKey: 'phq2_short_desc',
  domain: 'depression',
  itemCount: 2,
  items: [{ textKey: 'phq2_q1' }, { textKey: 'phq2_q2' }],
  scale: {
    labelKeys: ['phq9_scale_0', 'phq9_scale_1', 'phq9_scale_2', 'phq9_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  recommend: ['phq-9'],
  source: {
    citation: 'Kroenke K, Spitzer RL, Williams JB. The Patient Health Questionnaire-2: validity of a two-item depression screener. Med Care. 2003;41(11):1284-1292.',
    doi: '10.1097/01.MLR.0000093487.78664.3C',
    license: 'Public domain; Pfizer Inc.',
    publicDomain: true,
    yearPublished: 2003
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0); },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
