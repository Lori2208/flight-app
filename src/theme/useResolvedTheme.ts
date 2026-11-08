import { useColorScheme } from 'react-native';
import { useAppSelector } from '@/app/hooks';
import { darkTheme, lightTheme, type AppTheme } from './colors';
import { selectThemeMode } from './themeSlice';

export function useResolvedTheme(): AppTheme {
  const mode = useAppSelector(selectThemeMode);
  const systemScheme = useColorScheme(); 

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  return isDark ? darkTheme : lightTheme;
}