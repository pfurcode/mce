// src/views/Popup.tsx

import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Switch, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import WebAssetIcon from '@mui/icons-material/WebAsset';

import { DataService } from '../services/DataService';

export const Popup: React.FC = () => {
  const [isSidebarEnabled, setSidebarEnabled] = useState<boolean | null>(null);
  const [isNewTabEnabled, setNewTabEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const sidebar = await DataService.get('isSidebarEnabled', true);
      const newTab = await DataService.get('isNewTabEnabled', true);
      
      setSidebarEnabled(sidebar);
      setNewTabEnabled(newTab);
    };

    loadSettings();
  }, []);

  const handleSidebarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSidebarEnabled(isChecked);
    DataService.set('isSidebarEnabled', isChecked);
  };

  const handleNewTabChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setNewTabEnabled(isChecked);
    DataService.set('isNewTabEnabled', isChecked);
  };
  
  const handleSettingsClick = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  };
  
  if (isSidebarEnabled === null || isNewTabEnabled === null) {
    return <Box sx={{ width: '350px', height: '150px' }} />;
  }

  return (
    <Box sx={{ width: '350px', bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MCE Controls
          </Typography>
          <IconButton color="inherit" onClick={handleSettingsClick} title="Open Settings">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List>
        <ListItem>
          <ListItemIcon><ViewSidebarIcon /></ListItemIcon>
          <ListItemText primary="Enable Sidebar" />
          <Switch edge="end" onChange={handleSidebarChange} checked={isSidebarEnabled} />
        </ListItem>
        <ListItem>
          <ListItemIcon><WebAssetIcon /></ListItemIcon>
          <ListItemText primary="Enable Custom New Tab" />
          <Switch edge="end" onChange={handleNewTabChange} checked={isNewTabEnabled} />
        </ListItem>
      </List>

      <Divider />

      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">MCE v0.1.0</Typography>
      </Box>
    </Box>
  );
};