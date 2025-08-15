// src/components/RecentlyClosedTabsList.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { ChromeService } from '../../services/ChromeService';
import { DataService } from '../../services/DataService';
import type { AppSettings } from '../../types/settings';
import { useTranslation } from 'react-i18next';
import {
  Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip,
  IconButton, Typography,
} from '@mui/material';
import {
  Link as LinkIcon, Restore as RestoreIcon,
} from '@mui/icons-material';

export const RecentlyClosedTabsList: React.FC = () => {
  const [sessions, setSessions] = useState<chrome.sessions.Session[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const { t } = useTranslation();

  const loadData = useCallback(async () => {
    if (settings) {
      const recentlyClosed = await ChromeService.getRecentlyClosedTabs(settings.recentlyClosedTabs.maxTabs);
      setSessions(recentlyClosed);
    }
  }, [settings]);

  const loadSettings = useCallback(async () => {
    setSettings(await DataService.getSettings());
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  if (!settings) {
    return null; // <-- CRASH FIX: Wait for settings to load
  }

  useEffect(() => {
    loadData();
    const tabListeners = [chrome.tabs.onCreated, chrome.tabs.onRemoved];
    const handleStorageChange = () => { loadData(); loadSettings(); };
    tabListeners.forEach(l => l.addListener(loadData));
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      tabListeners.forEach(l => l.removeListener(loadData));
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [loadData, loadSettings]);

  const handleRestoreTab = (sessionId?: string) => { if (sessionId) ChromeService.restoreTab(sessionId); };
  const handleCopyUrl = (e: React.MouseEvent, url?: string) => { e.stopPropagation(); if (url) ChromeService.copyToClipboard(url); };
  const getHostname = (url?: string): string => { try { return new URL(url!).hostname; } catch { return ''; } };
  
  const getTimeAgo = (timestamp?: number) => {
    if (!timestamp) return '';
    // The timestamp from chrome.sessions is in seconds, convert to milliseconds
    const minutes = Math.floor((Date.now() - (timestamp * 1000)) / 60000);
    
    if (minutes < 1) return '< 1m';
    if (minutes < 60) return `${minutes}m`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    return `${days}d`;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, pl: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('recentlyClosedTabs')}</Typography>
      </Box>
      <Divider />
      <List dense sx={{ p: 1, maxHeight: `${settings?.recentlyClosedTabs.maxHeight}px`, overflowY: 'auto' }}>
        {sessions.map((session) => {
          const tab = session.tab;
          if (!tab) return null;
          return (
            <ListItemButton
              key={session.lastModified}
              onClick={() => handleRestoreTab(tab.sessionId)}
              sx={{
                minHeight: '40px',
                '&:hover .actions': {
                  opacity: 1,
                  pointerEvents: 'auto',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, flexShrink: 0 }}>
                <img src={`https://www.google.com/s2/favicons?domain=${getHostname(tab.url)}&sz=16`} width="16" height="16" alt="" />
              </ListItemIcon>
              <ListItemText
                primary={tab.title}
                primaryTypographyProps={{ noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}
                sx={{ flexGrow: 1, pr: 1, minWidth: 0 }}
              />
              {settings?.recentlyClosedTabs.showTime &&
                <Typography variant="caption" color="text.secondary" sx={{ pr: 1 }}>
                  {getTimeAgo(session.lastModified)}
                </Typography>
              }
              <Box className="actions" sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s' }}>
                <Tooltip title={t('copyUrl')}><IconButton size="small" onClick={(e) => handleCopyUrl(e, tab.url)}><LinkIcon fontSize="small" /></IconButton></Tooltip>
                <Tooltip title={t('restoreTab')}><IconButton size="small" onClick={() => handleRestoreTab(tab.sessionId)}><RestoreIcon fontSize="small" /></IconButton></Tooltip>
              </Box>
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  );
};