export type Severity = 'none' | 'minimal' | 'mild' | 'moderate' | 'mod-severe' | 'severe';

export type ScreenerDomain =
  | 'depression'
  | 'anxiety'
  | 'adhd'
  | 'ptsd'
  | 'substance'
  | 'sleep'
  | 'eating'
  | 'ocd'
  | 'social-anxiety'
  | 'burnout'
  | 'loneliness'
  | 'wellbeing'
  | 'personality'
  | 'somatic'
  | 'stress'
  | 'resilience'
  | 'life-satisfaction'
  | 'bipolar'
  | 'cognition'
  | 'functional-impairment';

export type ResponseScale = {
  labelKeys: string[];
  values: number[];
};

export type SeverityBand = {
  min: number;
  max: number;
  labelKey: string;
  severity: Severity;
  actionKey: string;
};

export type ScreenerItem = {
  textKey: string;
  reverseScored?: boolean;
};

export type ScreenerSource = {
  citation: string;
  doi?: string;
  url?: string;
  license: string;
  publicDomain: boolean;
  officialTranslationsUrl?: string;
  yearPublished: number;
};

export type Screener = {
  id: string;
  slug: string;
  nameKey: string;
  shortDescKey: string;
  domain: ScreenerDomain;
  itemCount: number;
  items: ScreenerItem[];
  scale: ResponseScale;
  bands: SeverityBand[];
  flagItems?: number[];
  flagThreshold?: number;
  suppressAdsOnResult?: boolean;
  recommend?: string[];
  source: ScreenerSource;
  score(answers: number[]): number;
  bandFor(score: number): SeverityBand;
  flagFired(answers: number[]): boolean;
};
