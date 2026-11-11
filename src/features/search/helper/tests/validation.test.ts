import { validateSearch } from './helper/validation';

const valid = {
  origin: 'TIA',
  destination: 'FCO',
  departureDate: '2026-11-20',
  arrivalDate: '2026-11-25',
};

describe('validateSearch', () => {
  it('returns null for a valid search', () => {
    expect(validateSearch(valid)).toBeNull();
  });

  it('requires an origin', () => {
    expect(validateSearch({ ...valid, origin: null })).toBe('Please choose where you fly from');
  });

  it('requires a destination', () => {
    expect(validateSearch({ ...valid, destination: null })).toBe('Please choose a destination');
  });

  it('rejects the same origin and destination', () => {
    expect(validateSearch({ ...valid, destination: 'TIA' })).toBe(
      'Origin and destination cannot be the same',
    );
  });

  it('rejects an arrival date before departure', () => {
    expect(validateSearch({ ...valid, arrivalDate: '2026-11-19' })).toBe(
      'Arrival date cannot be before departure',
    );
  });

  it('allows arrival on the same day as departure', () => {
    expect(validateSearch({ ...valid, arrivalDate: '2026-11-20' })).toBeNull();
  });
});
