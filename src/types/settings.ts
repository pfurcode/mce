// src/types/settings.ts

import type { Todo } from './todo';

type ThemeMode = 'light' | 'dark' | 'system';

interface ModuleSettings {
  enabled: boolean;
  version: string;
  descriptionKey: string;
}

interface OpenTabsListSettings extends ModuleSettings {
  title: string;
  behavior: {
    sortBy: 'index' | 'title' | 'url';
    maxHeight: number;
  };
  actions: {
    showCopyUrl: boolean;
    showDuplicateTab: boolean;
    showCloseTab: boolean;
  };
}

interface RecentlyClosedTabsSettings extends ModuleSettings {
    title: string;
    maxTabs: number;
    showTime: boolean;
    maxHeight: number;
}

type NewTabSettings = Record<string, never>;

export interface AppSettings {
  userName: string;
  theme: ThemeMode;
  todos: Todo[];
  openTabsList: OpenTabsListSettings;
  recentlyClosedTabs: RecentlyClosedTabsSettings;
  newTab: NewTabSettings;
}