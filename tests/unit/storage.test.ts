import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveAttempt,
  listAttempts,
  deleteAttempt,
  clearAll,
  exportJson,
  exportCsv
} from '$lib/storage';

type MockStorage = Storage & { _data: Record<string, string> };
beforeEach(() => {
  globalThis.localStorage = {
    _data: {} as Record<string, string>,
    getItem(k: string) { return (this as unknown as MockStorage)._data[k] ?? null; },
    setItem(k: string, v: string) { (this as unknown as MockStorage)._data[k] = v; },
    removeItem(k: string) { delete (this as unknown as MockStorage)._data[k]; },
    clear() { (this as unknown as MockStorage)._data = {}; },
    key() { return null; },
    length: 0
  } as unknown as Storage;
});

describe('storage', () => {
  it('starts empty', () => {
    expect(listAttempts()).toEqual([]);
  });

  it('saves and lists', () => {
    saveAttempt({
      id: 'a1',
      screenerId: 'phq-9',
      completedAt: '2026-05-14T10:00:00Z',
      locale: 'en',
      answers: [0, 1, 2, 3, 0, 1, 2, 1, 0],
      score: 10,
      band: 'severity_moderate',
      flagged: false
    });
    expect(listAttempts()).toHaveLength(1);
  });

  it('deletes by id', () => {
    saveAttempt({
      id: 'a1',
      screenerId: 'phq-9',
      completedAt: '2026-05-14T10:00:00Z',
      locale: 'en',
      answers: [],
      score: 0,
      band: '',
      flagged: false
    });
    saveAttempt({
      id: 'a2',
      screenerId: 'gad-7',
      completedAt: '2026-05-14T11:00:00Z',
      locale: 'en',
      answers: [],
      score: 0,
      band: '',
      flagged: false
    });
    deleteAttempt('a1');
    expect(listAttempts().map((a) => a.id)).toEqual(['a2']);
  });

  it('clearAll empties', () => {
    saveAttempt({
      id: 'a1',
      screenerId: 'phq-9',
      completedAt: '',
      locale: 'en',
      answers: [],
      score: 0,
      band: '',
      flagged: false
    });
    clearAll();
    expect(listAttempts()).toEqual([]);
  });

  it('exports JSON', () => {
    saveAttempt({
      id: 'a1',
      screenerId: 'phq-9',
      completedAt: '2026-05-14T10:00:00Z',
      locale: 'en',
      answers: [0],
      score: 0,
      band: 'severity_minimal',
      flagged: false
    });
    const json = exportJson();
    expect(JSON.parse(json)).toHaveLength(1);
  });

  it('exports CSV', () => {
    saveAttempt({
      id: 'a1',
      screenerId: 'phq-9',
      completedAt: '2026-05-14T10:00:00Z',
      locale: 'en',
      answers: [1, 2],
      score: 3,
      band: 'severity_minimal',
      flagged: false
    });
    const csv = exportCsv();
    expect(csv.split('\n')[0]).toContain('id');
    expect(csv).toContain('phq-9');
  });
});
