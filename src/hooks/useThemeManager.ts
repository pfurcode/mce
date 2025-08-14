// src/hooks/useThemeManager.ts

import { useEffect } from 'react';
import type { AppSettings } from '../types/settings';

export function useThemeManager(settings: AppSettings | null) {
  useEffect(() => {
    const applyTheme = (currentSettings: AppSettings) => {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      let themeToApply = currentSettings.theme;

      if (themeToApply === 'system') {
        themeToApply = isSystemDark ? 'dark' : 'light';
      }

      document.documentElement.className = `theme-${themeToApply}`;
    };

    if (settings) {
      applyTheme(settings);
    }
  }, [settings]);
}