import type { AppSettings } from '../../types/settings';

export const recentlyClosedTabsDefaultSettings: AppSettings['recentlyClosedTabs'] = {
  enabled: true,
  version: '1.0.0',
  descriptionKey: 'recentlyClosedTabsDescription',
  title: 'recentlyClosedTabs',
  maxTabs: 10,
  showTime: true,
};
