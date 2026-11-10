import {
  addDays,
  formatDuration,
  formatLongDate,
  formatShortDate,
  fromISODate,
  toISODate,
} from './date';

describe('toISODate', () => {
  it('formats a local date with zero padding', () => {
    expect(toISODate(new Date(2026, 10, 5))).toBe('2026-11-05');
  });
});

describe('fromISODate', () => {
  it('creates a local date at midnight', () => {
    const date = fromISODate('2026-11-05');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(10); // November (months start at 0)
    expect(date.getDate()).toBe(5);
  });
});

describe('addDays', () => {
  it('rolls over into the next month', () => {
    expect(toISODate(addDays(new Date(2026, 10, 29), 3))).toBe('2026-12-02');
  });
});

describe('formatting', () => {
  it('formats a short date', () => {
    expect(formatShortDate('2026-11-15')).toBe('15 Nov');
  });

  it('formats a long date with the weekday', () => {
    expect(formatLongDate('2026-11-15')).toBe('Sun, 15 Nov');
  });

  it('formats a duration in hours and minutes', () => {
    expect(formatDuration('2026-11-20T06:00:00Z', '2026-11-20T07:25:00Z')).toBe('1h 25m');
  });

  it('formats a duration under an hour', () => {
    expect(formatDuration('2026-11-20T06:00:00Z', '2026-11-20T06:45:00Z')).toBe('45m');
  });
});
