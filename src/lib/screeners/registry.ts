import type { Screener } from './types';
import { phq9 } from './phq-9';
import { phq2 } from './phq-2';
import { gad7 } from './gad-7';
import { cesd } from './ces-d';
import { promisDepression } from './promis-depression';
import { wsas } from './wsas';
import { who5 } from './who-5';

export const screeners: Screener[] = [phq9, phq2, gad7, cesd, promisDepression, wsas, who5];

export const screenerById = (id: string): Screener | undefined =>
  screeners.find((s) => s.id === id);

export const screenerSlugs: string[] = screeners
  .map((s) => s.slug)
  .filter((slug): slug is string => slug !== '');
