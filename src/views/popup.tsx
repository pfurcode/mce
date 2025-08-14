// src/views/popup.tsx

import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Switch, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';

export const Popup: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  const handleSwitchChange = (key: 'openTabsList' | 'newTab') => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    
    const newSettings = {
      ...settings,
      [key]: {
        ...settings[key],
        enabled: event.target.checked,
      }
    };
    
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };
  
  const handleSettingsClick = () => {
    if (chrome.runtime.openOptionsPage) chrome.runtime.openOptionsPage();
  };
  
  if (!settings) return <Box sx={{ width: '350px', height: '150px' }} />;

  return (
    <Box sx={{ width: '350px', bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>MCE Controls</Typography>
          <IconButton color="inherit" onClick={handleSettingsClick} title="Open Settings"><SettingsIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemIcon><ViewSidebarIcon /></ListItemIcon>
          <ListItemText primary="Enable Sidebar" />
          <Switch edge="end" checked={settings.openTabsList.enabled} onChange={handleSwitchChange('openTabsList')} />
        </ListItem>
        <ListItem>
          <ListItemIcon><WebAssetIcon /></ListItemIcon>
          <ListItemText primary="Enable Custom New Tab" />
          <Switch edge="end" checked={settings.newTab.enabled} onChange={handleSwitchChange('newTab')} />
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">MCE v0.1.0</Typography>
      </Box>
    </Box>
  );
};