// src/types/settings.ts

import type { Todo } from './todo';

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
    // Removed: enableTabGrouping: boolean;
  };
  actions: {
    showCopyUrl: boolean;
    showDuplicateTab: boolean;
    showCloseTab: boolean;
  };
}

interface NewTabSettings extends ModuleSettings {
  // We can add specific settings for the New Tab page here later
}

export interface AppSettings {
  userName: string;
  todos: Todo[];
  openTabsList: OpenTabsListSettings;
  newTab: NewTabSettings;
}