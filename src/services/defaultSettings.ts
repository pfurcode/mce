// src/services/defaultSettings.ts
import type { AppSettings } from '../types/settings';

export const defaultSettings: AppSettings = {
  userName: 'Paweł',
  theme: 'system',
  todos: [],
  openTabsList: {
    enabled: true,
    version: '1.0.0',
    descriptionKey: 'openTabsListDescription', // klucz i18n
    title: 'openTabs', // KLUCZ i18n zamiast literalnego "Open Tabs"
    behavior: {
      sortBy: 'index',
      maxHeight: 250,
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
