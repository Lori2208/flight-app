import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

type ExtraColors = {
  textSecondary: string;
  danger: string;
  onPrimary: string;
  inputBackground: string;
  success: string;
  warning: string;
};

export type AppTheme = Theme & { colors: Theme['colors'] & ExtraColors };

export const lightTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563eb',
    background: '#f5f6f8',
    card: '#ffffff',
    text: '#111827',
    border: '#e5e7eb',
    notification: '#ef4444',
    textSecondary: '#6b7280',
    danger: '#d32f2f',
    onPrimary: '#ffffff',
    inputBackground: '#ffffff',
    success: '#16a34a',
    warning: '#d97706',
  },
};

export const darkTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#60a5fa',
    background: '#0b1120',
    card: '#111827',
    text: '#f3f4f6',
    border: '#1f2937',
    notification: '#f87171',
    textSecondary: '#9ca3af',
    danger: '#f87171',
    onPrimary: '#0b1120',
    inputBackground: '#1f2937',
    success: '#4ade80',
    warning: '#fbbf24',
  },
};
