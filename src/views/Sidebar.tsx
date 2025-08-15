// src/views/Sidebar.tsx

import React, { useState, useEffect } from 'react';
import { Drawer, Divider } from '@mui/material';
import { Footer } from '../components/Footer';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';
import { OpenTabsList } from '../modules/openTabsList/OpenTabsList';
import { RecentlyClosedTabsList } from '../modules/recentlyClosedTabs/RecentlyClosedTabsList';

export const Sidebar: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const currentSettings = await DataService.getSettings();
      setSettings(currentSettings);
    };

    loadSettings();

    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.openTabsList || changes.recentlyClosedTabs) {
        loadSettings();
      }
    };
    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  if (!settings) {
    return null; // Don't render anything while settings are loading
  }

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
    >
      {settings.openTabsList.enabled && <OpenTabsList />}
      {settings.recentlyClosedTabs.enabled && <RecentlyClosedTabsList />}
      <Divider />
      <Footer />
    </Drawer>
  );
};