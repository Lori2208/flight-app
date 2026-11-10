import { useTheme } from '@react-navigation/native';
import type { AppTheme } from './colors';

export function useAppTheme(): AppTheme {
  return useTheme() as AppTheme;
}
