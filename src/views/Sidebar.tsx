// src/views/Sidebar.tsx

import React, { useState, useEffect } from 'react';
import { Drawer, Divider } from '@mui/material';
import { OpenTabsList } from '../components/OpenTabsList';
import { Footer } from '../components/Footer';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';

export const Sidebar: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const currentSettings = await DataService.getSettings();
      setSettings(currentSettings);
    };

    loadSettings();

    // Listen for changes to the settings and update the state
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.openTabsList) {
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
      {/* Conditionally render the OpenTabsList based on settings */}
      {settings.openTabsList.enabled && <OpenTabsList />}
      <Divider />
      {/* The Footer component with settings and clock */}
      <Footer />
    </Drawer>
  );
};