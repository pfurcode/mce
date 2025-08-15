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

type NewTabSettings = Record<string, never>;

export interface AppSettings {
  userName: string;
  theme: ThemeMode;
  todos: Todo[];
  openTabsList: OpenTabsListSettings;
  newTab: NewTabSettings;
}
