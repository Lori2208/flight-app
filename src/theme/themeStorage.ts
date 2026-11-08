import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemeMode } from './themeSlice';

const THEME_KEY = 'flight-app/theme-mode';
const VALID_MODES: ThemeMode[] = ['system', 'light', 'dark'];

export async function saveThemeMode(mode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, mode);
}

export async function loadThemeMode(): Promise<ThemeMode | null> {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    return VALID_MODES.includes(value as ThemeMode) ? (value as ThemeMode) : null;
  } catch {
    return null;
  }
}