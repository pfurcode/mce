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
  newTab: {},
};
