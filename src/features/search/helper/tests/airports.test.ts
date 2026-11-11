import { findAirport, searchAirports } from '../airports';

describe('searchAirports', () => {
  it('returns every airport for an empty query', () => {
    expect(searchAirports('')).toHaveLength(6);
  });

  it('matches by code, ignoring case', () => {
    expect(searchAirports('fco').map((a) => a.code)).toEqual(['FCO']);
  });

  it('matches by city', () => {
    expect(searchAirports('rome').map((a) => a.code)).toEqual(['FCO']);
  });

  it('matches by airport name', () => {
    expect(searchAirports('international').map((a) => a.code)).toEqual(['TIA', 'VIE']);
  });

  it('excludes the given airport', () => {
    const codes = searchAirports('', 'TIA').map((a) => a.code);
    expect(codes).toHaveLength(5);
    expect(codes).not.toContain('TIA');
  });

  it('returns an empty list when nothing matches', () => {
    expect(searchAirports('xyz')).toEqual([]);
  });
});

describe('findAirport', () => {
  it('finds an airport by code', () => {
    expect(findAirport('LHR')?.city).toBe('London');
  });

  it('returns undefined for null', () => {
    expect(findAirport(null)).toBeUndefined();
  });
});
