// src/components/ThemeManager.tsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';
import { getTheme } from '../theme';

interface ThemeManagerProps {
  children: React.ReactNode;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
  const [theme, setTheme] = useState(createTheme(getTheme('system')));

  useEffect(() => {
    // Function to apply the correct theme
    const applyTheme = async () => {
      const settings: AppSettings = await DataService.getSettings();
      setTheme(createTheme(getTheme(settings.theme)));
    };

    // Load initial theme from settings
    applyTheme();

    // Listen for theme changes from the extension's storage
    const storageListener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.theme) {
        applyTheme();
      }
    };
    chrome.storage.onChanged.addListener(storageListener);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaQueryListener = () => {
      // Re-apply the theme if the user's preference is 'system'
      DataService.getSettings().then((settings: AppSettings) => {
        if (settings.theme === 'system') {
          setTheme(createTheme(getTheme('system')));
        }
      });
    };
    mediaQuery.addListener(mediaQueryListener);

    // Clean up the listeners when the component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
      mediaQuery.removeListener(mediaQueryListener);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};