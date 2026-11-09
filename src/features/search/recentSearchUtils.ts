import type { RecentSearch, SearchParams } from '@/types';

export const MAX_RECENT_SEARCHES = 10;

export function isSameSearch(a: SearchParams, b: SearchParams): boolean {
  return (
    a.origin === b.origin &&
    a.destination === b.destination &&
    a.departureDate === b.departureDate &&
    a.arrivalDate === b.arrivalDate
  );
}


export function getSearchesToDelete(
  existing: RecentSearch[],
  next: SearchParams,
  max = MAX_RECENT_SEARCHES,
): RecentSearch[] {
  const duplicates = existing.filter((search) => isSameSearch(search, next));
  const others = existing.filter((search) => !isSameSearch(search, next));
  const overflow = others.slice(max - 1); // keep max-1, the new one makes it max
  return [...duplicates, ...overflow];
}