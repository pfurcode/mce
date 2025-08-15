// src/types/settings.ts

import type { Todo } from './todo';

type ThemeMode = 'light' | 'dark' | 'system';

interface ModuleSettings {
  enabled: boolean;
  version: string;
  descriptionKey: string; // klucz do tłumaczenia
}

interface OpenTabsListSettings extends ModuleSettings {
  title: string; // KLUCZ tłumaczenia, np. 'openTabs'
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

// For now `NewTabSettings` doesn't add any extra fields, so use a type alias
// instead of an empty interface to avoid lint errors.
type NewTabSettings = ModuleSettings;

export interface AppSettings {
  userName: string;
  theme: ThemeMode;
  todos: Todo[];
  openTabsList: OpenTabsListSettings;
  newTab: NewTabSettings;
}
