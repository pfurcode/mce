// src/theme.ts
import type { ThemeOptions } from '@mui/material/styles'; // Corrected import

export type ThemeMode = 'light' | 'dark' | 'system';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
  },
  // You can add more light theme customizations here
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
  // You can add more dark theme customizations here
};

export function getTheme(mode: ThemeMode): ThemeOptions {
  if (mode === 'light') {
    return lightTheme;
  }
  if (mode === 'dark') {
    return darkTheme;
  }
  
  // Default to system theme
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isSystemDark ? darkTheme : lightTheme;
}