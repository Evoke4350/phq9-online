import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 9, labelKey: 'wsas_subclinical', severity: 'mild', actionKey: 'wsas_action_subclinical' },
  { min: 10, max: 19, labelKey: 'wsas_significant', severity: 'moderate', actionKey: 'wsas_action_significant' },
  { min: 20, max: 40, labelKey: 'wsas_severe', severity: 'severe', actionKey: 'wsas_action_severe' }
];
const noBand: SeverityBand = { min: 0, max: 0, labelKey: 'wsas_none', severity: 'none', actionKey: 'wsas_action_none' };

export const wsas: Screener = {
  id: 'wsas',
  slug: 'wsas',
  nameKey: 'wsas_name',
  shortDescKey: 'wsas_short_desc',
  domain: 'functional-impairment',
  itemCount: 5,
  items: Array.from({ length: 5 }, (_, i) => ({ textKey: `wsas_q${i + 1}` })),
  scale: {
    labelKeys: ['wsas_scale_0','wsas_scale_1','wsas_scale_2','wsas_scale_3','wsas_scale_4','wsas_scale_5','wsas_scale_6','wsas_scale_7','wsas_scale_8'],
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },
  bands: [noBand, ...bands],
  source: {
    citation: 'Mundt JC, Marks IM, Shear MK, Greist JH. The Work and Social Adjustment Scale: a simple measure of impairment in functioning. Br J Psychiatry. 2002;180:461-464.',
    doi: '10.1192/bjp.180.5.461',
    license: 'Public domain; free to use, copy, and translate.',
    publicDomain: true,
    yearPublished: 2002
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0); },
  bandFor(score) {
    if (score === 0) return noBand;
    return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!;
  },
  flagFired() { return false; }
};
