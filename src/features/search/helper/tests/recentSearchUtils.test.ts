import type { RecentSearch } from '@/types';
import { getSearchesToDelete, isSameSearch } from '../recentSearchUtils';

function makeSearch(id: number, overrides: Partial<RecentSearch> = {}): RecentSearch {
  return {
    id,
    userId: 1,
    origin: 'TIA',
    destination: 'FCO',
    departureDate: `2026-12-${String(id).padStart(2, '0')}`,
    arrivalDate: '2026-12-31',
    createdAt: `2026-11-09T10:00:${String(60 - id).padStart(2, '0')}Z`,
    ...overrides,
  };
}

describe('isSameSearch', () => {
  it('matches the same route and dates', () => {
    expect(isSameSearch(makeSearch(1), makeSearch(2, { departureDate: '2026-12-01' }))).toBe(true);
  });

  it('does not match when a date differs', () => {
    expect(isSameSearch(makeSearch(1), makeSearch(2))).toBe(false);
  });
});

describe('getSearchesToDelete', () => {
  it('deletes nothing when the search is new and the list has space', () => {
    const existing = [makeSearch(1), makeSearch(2), makeSearch(3)];
    const next = { ...makeSearch(99), departureDate: '2026-12-20' };
    expect(getSearchesToDelete(existing, next)).toEqual([]);
  });

  it('deletes the duplicate so it can move to the top', () => {
    const existing = [makeSearch(1), makeSearch(2), makeSearch(3)];
    expect(getSearchesToDelete(existing, makeSearch(2)).map((s) => s.id)).toEqual([2]);
  });

  it('deletes the oldest search when the list is full', () => {
    const existing = Array.from({ length: 10 }, (_, i) => makeSearch(i + 1)); // newest first
    const next = { ...makeSearch(99), departureDate: '2026-12-25' };
    expect(getSearchesToDelete(existing, next).map((s) => s.id)).toEqual([10]);
  });

  it('only deletes the duplicate when the list is full and the search already exists', () => {
    const existing = Array.from({ length: 10 }, (_, i) => makeSearch(i + 1));
    expect(getSearchesToDelete(existing, makeSearch(5)).map((s) => s.id)).toEqual([5]);
  });
});
