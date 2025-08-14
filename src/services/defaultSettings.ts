// src/services/defaultSettings.ts
import type { AppSettings } from '../types/settings';

export const defaultSettings: AppSettings = {
  theme: 'system', // Set the default to system
  userName: 'Paweł',
  todos: [],
  openTabsList: {
    enabled: true,
    version: '1.0.0',
    descriptionKey: 'openTabsListDescription',
    title: 'Open Tabs',
    behavior: {
      sortBy: 'index',
      maxHeight: 250,
      // Removed: enableTabGrouping: true,
    },
    actions: {
      showCopyUrl: true,
      showDuplicateTab: true,
      showCloseTab: true,
    },
  },
  newTab: {
    enabled: true,
    version: '1.0.0',
    descriptionKey: 'newTabDescription',
  },
};