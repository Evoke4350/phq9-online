import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  {
    min: 0,
    max: 4,
    labelKey: 'severity_minimal',
    severity: 'minimal',
    actionKey: 'phq9_action_minimal'
  },
  { min: 5, max: 9, labelKey: 'severity_mild', severity: 'mild', actionKey: 'phq9_action_mild' },
  {
    min: 10,
    max: 14,
    labelKey: 'severity_moderate',
    severity: 'moderate',
    actionKey: 'phq9_action_moderate'
  },
  {
    min: 15,
    max: 19,
    labelKey: 'severity_mod_severe',
    severity: 'mod-severe',
    actionKey: 'phq9_action_mod_severe'
  },
  {
    min: 20,
    max: 27,
    labelKey: 'severity_severe',
    severity: 'severe',
    actionKey: 'phq9_action_severe'
  }
];

export const phq9: Screener = {
  id: 'phq-9',
  slug: '',
  nameKey: 'phq9_name',
  shortDescKey: 'phq9_short_desc',
  domain: 'depression',
  itemCount: 9,
  items: [
    { textKey: 'phq9_q1' },
    { textKey: 'phq9_q2' },
    { textKey: 'phq9_q3' },
    { textKey: 'phq9_q4' },
    { textKey: 'phq9_q5' },
    { textKey: 'phq9_q6' },
    { textKey: 'phq9_q7' },
    { textKey: 'phq9_q8' },
    { textKey: 'phq9_q9' }
  ],
  scale: {
    labelKeys: ['phq9_scale_0', 'phq9_scale_1', 'phq9_scale_2', 'phq9_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  flagItems: [8],
  flagThreshold: 1,
  recommend: ['gad-7', 'wsas'],
  source: {
    citation:
      'Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.',
    doi: '10.1046/j.1525-1497.2001.016009606.x',
    url: 'https://www.phqscreeners.com/',
    license:
      'Public domain; developed by Pfizer Inc. with educational grant. No permission required for reproduction.',
    publicDomain: true,
    officialTranslationsUrl: 'https://www.phqscreeners.com/select-screener',
    yearPublished: 1999
  },
  score(answers) {
    return answers.reduce((sum, v) => sum + v, 0);
  },
  bandFor(score) {
    return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!;
  },
  flagFired(answers) {
    return (this.flagItems ?? []).some((i) => (answers[i] ?? 0) >= (this.flagThreshold ?? 1));
  }
};
