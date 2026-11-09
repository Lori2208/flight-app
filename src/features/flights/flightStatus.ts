import type { AppTheme } from '@/theme/colors';
import type { FlightStatus } from '@/types';

export function getStatusColor(status: FlightStatus, colors: AppTheme['colors']): string {
  switch (status) {
    case 'On time':
    case 'Boarding':
      return colors.success;
    case 'Delayed':
      return colors.warning;
    case 'Cancelled':
      return colors.danger;
    default:
      return colors.textSecondary;
  }
}