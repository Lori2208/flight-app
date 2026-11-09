const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}


export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


export function formatLongDate(iso: string): string {
  const date = fromISODate(iso);
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}


export function formatShortDate(iso: string): string {
  const date = fromISODate(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/** "2026-11-20T06:00:00Z" → "07:00" (in the device's time zone) */
export function formatTime(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/** Duration between two ISO date-times → "1h 25m" */
export function formatDuration(startIso: string, endIso: string): string {
  const minutes = Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** "2026-11-10T07:10:00Z" → "Tue, 10 Nov" (in the device's time zone) */
export function formatDateFromDateTime(isoDateTime: string): string {
  return formatLongDate(toISODate(new Date(isoDateTime)));
}