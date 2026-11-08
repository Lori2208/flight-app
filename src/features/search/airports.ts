import type { Airport } from '@/types';

export const AIRPORTS: Airport[] = [
  { code: 'TIA', city: 'Tirana', name: 'Tirana International Airport' },
  { code: 'FCO', city: 'Rome', name: 'Leonardo da Vinci–Fiumicino' },
  { code: 'MXP', city: 'Milan', name: 'Milan Malpensa' },
  { code: 'VIE', city: 'Vienna', name: 'Vienna International Airport' },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport' },
  { code: 'LHR', city: 'London', name: 'London Heathrow' },
];

export function findAirport(code: string | null): Airport | undefined {
  return AIRPORTS.find((airport) => airport.code === code);
}

export function searchAirports(query: string, excludeCode?: string | null): Airport[] {
  const q = query.trim().toLowerCase();
  return AIRPORTS.filter(
    (airport) =>
      airport.code !== excludeCode &&
      (!q ||
        airport.code.toLowerCase().includes(q) ||
        airport.city.toLowerCase().includes(q) ||
        airport.name.toLowerCase().includes(q)),
  );
}