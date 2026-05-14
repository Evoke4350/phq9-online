import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  {
    min: 0,
    max: 4,
    labelKey: 'severity_minimal',
    severity: 'minimal',
    actionKey: 'gad7_action_minimal'
  },
  { min: 5, max: 9, labelKey: 'severity_mild', severity: 'mild', actionKey: 'gad7_action_mild' },
  {
    min: 10,
    max: 14,
    labelKey: 'severity_moderate',
    severity: 'moderate',
    actionKey: 'gad7_action_moderate'
  },
  {
    min: 15,
    max: 21,
    labelKey: 'severity_severe',
    severity: 'severe',
    actionKey: 'gad7_action_severe'
  }
];

export const gad7: Screener = {
  id: 'gad-7',
  slug: 'gad-7',
  nameKey: 'gad7_name',
  shortDescKey: 'gad7_short_desc',
  domain: 'anxiety',
  itemCount: 7,
  items: Array.from({ length: 7 }, (_, i) => ({ textKey: `gad7_q${i + 1}` })),
  scale: {
    labelKeys: ['phq9_scale_0', 'phq9_scale_1', 'phq9_scale_2', 'phq9_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  recommend: ['phq-9'],
  source: {
    citation:
      'Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.',
    doi: '10.1001/archinte.166.10.1092',
    license: 'Public domain; Pfizer Inc.',
    publicDomain: true,
    yearPublished: 2006
  },
  score(answers) {
    return answers.reduce((s, v) => s + v, 0);
  },
  bandFor(score) {
    return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!;
  },
  flagFired() {
    return false;
  }
};
