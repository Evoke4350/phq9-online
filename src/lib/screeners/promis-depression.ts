import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 8, max: 11, labelKey: 'severity_none', severity: 'none', actionKey: 'promis_action_none' },
  {
    min: 12,
    max: 18,
    labelKey: 'severity_mild',
    severity: 'mild',
    actionKey: 'promis_action_mild'
  },
  {
    min: 19,
    max: 26,
    labelKey: 'severity_moderate',
    severity: 'moderate',
    actionKey: 'promis_action_moderate'
  },
  {
    min: 27,
    max: 40,
    labelKey: 'severity_severe',
    severity: 'severe',
    actionKey: 'promis_action_severe'
  }
];

export const promisDepression: Screener = {
  id: 'promis-depression',
  slug: 'promis-depression',
  nameKey: 'promis_depression_name',
  shortDescKey: 'promis_depression_short_desc',
  domain: 'depression',
  itemCount: 8,
  items: Array.from({ length: 8 }, (_, i) => ({ textKey: `promis_depression_q${i + 1}` })),
  scale: {
    labelKeys: [
      'promis_scale_1',
      'promis_scale_2',
      'promis_scale_3',
      'promis_scale_4',
      'promis_scale_5'
    ],
    values: [1, 2, 3, 4, 5]
  },
  bands,
  source: {
    citation:
      'Pilkonis PA, Choi SW, Reise SP, et al. Item banks for measuring emotional distress from the Patient-Reported Outcomes Measurement Information System (PROMIS): Depression, Anxiety, and Anger. Assessment. 2011;18(3):263-283.',
    doi: '10.1177/1073191111411667',
    url: 'https://www.healthmeasures.net/explore-measurement-systems/promis',
    license: 'Public domain; developed by NIH PROMIS initiative.',
    publicDomain: true,
    yearPublished: 2011
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
