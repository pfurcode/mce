// src/services/defaultSettings.ts

import type { AppSettings } from '../types/settings';

export const defaultSettings: AppSettings = {
  userName: 'Paweł',
  theme: 'system',
  todos: [],
  openTabsList: {
    enabled: true,
    version: '1.0.0',
    descriptionKey: 'openTabsListDescription',
    title: 'openTabs',
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
  recentlyClosedTabs: {
    enabled: true,
    version: '1.0.0',
    descriptionKey: 'recentlyClosedTabsDescription',
    title: 'recentlyClosedTabs',
    maxTabs: 10,
    showTime: true,
    maxHeight: 150,
  },
  newTab: {},
};