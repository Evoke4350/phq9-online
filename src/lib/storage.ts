export type Attempt = {
  id: string;
  screenerId: string;
  completedAt: string;
  locale: string;
  answers: number[];
  score: number;
  band: string;
  flagged: boolean;
};

const KEY = 'phq9-online:history:v1';

const read = (): Attempt[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (items: Attempt[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* quota exceeded or disabled — swallow */
  }
};

export const listAttempts = (): Attempt[] => read();

export const saveAttempt = (a: Attempt): void => {
  const list = read();
  list.push(a);
  write(list);
};

export const deleteAttempt = (id: string): void => {
  write(read().filter((a) => a.id !== id));
};

export const clearAll = (): void => {
  write([]);
};

export const exportJson = (): string => JSON.stringify(read(), null, 2);

export const exportCsv = (): string => {
  const rows = read();
  const header = [
    'id',
    'screenerId',
    'completedAt',
    'locale',
    'score',
    'band',
    'flagged',
    'answers'
  ];
  const body = rows.map((a) =>
    [
      a.id,
      a.screenerId,
      a.completedAt,
      a.locale,
      a.score,
      a.band,
      a.flagged,
      a.answers.join('|')
    ].join(',')
  );
  return [header.join(','), ...body].join('\n');
};
