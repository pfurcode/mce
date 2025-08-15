// src/services/defaultSettings.ts

import type { AppSettings } from '../types/settings';
import { openTabsListDefaultSettings } from '../modules/openTabsList/defaultSettings';
import { recentlyClosedTabsDefaultSettings } from '../modules/recentlyClosedTabs/defaultSettings';

export const defaultSettings: AppSettings = {
  userName: 'Paweł',
  theme: 'system',
  todos: [],
  openTabsList: openTabsListDefaultSettings,
  recentlyClosedTabs: recentlyClosedTabsDefaultSettings,
  newTab: {},
};