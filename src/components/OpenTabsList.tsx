import React, { useState, useEffect, useCallback } from 'react';
import { ChromeService } from '../services/ChromeService';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';
import { useTranslation } from 'react-i18next';
import {
  Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip,
  IconButton, Typography, Collapse, alpha,
} from '@mui/material';
import {
  Link as LinkIcon, Close as CloseIcon, Add as AddIcon,
  FilterNone as FilterNoneIcon, ExpandMore as ExpandMoreIcon,
  Launch as LaunchIcon, WorkspacesOutlined as WorkspacesOutlinedIcon,
  PushPin as PushPinIcon, PushPinOutlined as PushPinOutlinedIcon,
  VolumeOff as VolumeOffIcon, VolumeUp as VolumeUpIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';

const groupColorMap: { [key in chrome.tabGroups.Color]: string } = {
  grey: '#5f6368', blue: '#1a73e8', red: '#d93025', yellow: '#fad232',
  green: '#1e8e3e', pink: '#ff4081', purple: '#9334e6', cyan: '#007b83', orange: '#fa7b17',
};

export const OpenTabsList: React.FC = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [groups, setGroups] = useState<chrome.tabGroups.TabGroup[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<number, boolean>>({});
  const [hoveredTabId, setHoveredTabId] = useState<number | null>(null);
  const { t } = useTranslation();

  const loadData = useCallback(async () => {
    const { tabs, groups } = await ChromeService.getTabsAndGroups();
    
    const sortedTabs = tabs.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (a.index || 0) - (b.index || 0);
    });

    setTabs(sortedTabs);
    setGroups(groups);
    if (!settings) setSettings(await DataService.getSettings());
  }, [settings]);

  useEffect(() => {
    loadData();
    const tabListeners = [chrome.tabs.onCreated, chrome.tabs.onRemoved, chrome.tabs.onUpdated, chrome.tabs.onAttached, chrome.tabs.onDetached, chrome.tabs.onMoved];
    const groupListeners = [chrome.tabGroups.onCreated, chrome.tabGroups.onRemoved, chrome.tabGroups.onMoved, chrome.tabGroups.onUpdated];
    tabListeners.forEach(l => l.addListener(loadData));
    groupListeners.forEach(l => l.addListener(loadData));
    chrome.storage.onChanged.addListener(loadData);
    return () => {
      tabListeners.forEach(l => l.removeListener(loadData));
      groupListeners.forEach(l => l.removeListener(loadData));
      chrome.storage.onChanged.removeListener(loadData);
    };
  }, [loadData]);
  
  const handleSwitchToTab = (tabId?: number) => { if (tabId) ChromeService.switchToTab(tabId); };
  const handleCopyUrl = (e: React.MouseEvent, url?: string) => { e.stopPropagation(); if (url) ChromeService.copyToClipboard(url); };
  const handleCloseTab = (e: React.MouseEvent, tabId?: number) => { e.stopPropagation(); if (tabId) ChromeService.closeTab(tabId); };
  const handleDuplicateTab = (e: React.MouseEvent, tabId?: number) => { e.stopPropagation(); if (tabId) ChromeService.duplicateTab(tabId); };
  const handleGroupToggle = (groupId: number) => setCollapsedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  const handleCloseGroup = (e: React.MouseEvent, groupId: number) => { e.stopPropagation(); ChromeService.closeGroup(tabs, groupId); };
  const handleMoveGroup = (e: React.MouseEvent, group: chrome.tabGroups.TabGroup) => { e.stopPropagation(); ChromeService.moveGroupToNewWindow(tabs, group); };
  const handleUngroup = (e: React.MouseEvent, groupId: number) => { e.stopPropagation(); ChromeService.ungroup(tabs, groupId); };
  const handleTogglePin = (e: React.MouseEvent, tab: chrome.tabs.Tab) => { e.stopPropagation(); if (tab.id) ChromeService.togglePin(tab.id, tab.pinned); };
  const handleToggleMute = (e: React.MouseEvent, tab: chrome.tabs.Tab) => { e.stopPropagation(); if (tab.id && tab.mutedInfo) ChromeService.toggleMute(tab.id, tab.mutedInfo.muted); };
  const getHostname = (url?: string): string => { try { return new URL(url!).hostname; } catch { return ''; } };

  const actions = settings?.openTabsList.actions;
  const groupMap = new Map(groups.map(g => [g.id, g]));
  const groupedTabs = Object.values(tabs.reduce((acc, tab) => {
    const groupId = tab.groupId > 0 ? tab.groupId : 'ungrouped';
    (acc[groupId] = acc[groupId] || []).push(tab);
    return acc;
  }, {} as Record<string | number, chrome.tabs.Tab[]>));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, pl: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('openTabs')}</Typography>
        <Box>
          <Tooltip title={t('exportTabs')}><IconButton size="small" onClick={() => ChromeService.exportTabsToFile(tabs)}><FileDownloadIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="New Tab"><IconButton size="small" onClick={() => ChromeService.createNewTab()}><AddIcon fontSize="small" /></IconButton></Tooltip>
        </Box>
      </Box>
      <Divider />
      <List dense sx={{ p: 1, maxHeight: '300px', overflowY: 'auto' }}>
        {groupedTabs.map((tabsInGroup) => {
          const firstTab = tabsInGroup[0];
          const group = firstTab.groupId > 0 ? groupMap.get(firstTab.groupId) : null;
          const isCollapsed = group ? collapsedGroups[group.id] : false;
          return (
            <Box key={group ? group.id : 'ungrouped'}>
              {group && (
                <ListItemButton onClick={() => handleGroupToggle(group.id)} sx={{ 
                  '& .group-actions': { opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s' }, 
                  '&:hover .group-actions': { opacity: 1, pointerEvents: 'auto' } 
                }}>
                  <ExpandMoreIcon sx={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', mr: 1 }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: groupColorMap[group.color], mr: 1, flexShrink: 0 }} />
                  <Typography noWrap variant="caption" sx={{ fontWeight: 'bold', flexGrow: 1 }}>{group.title}</Typography>
                  <Box className="group-actions" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title={t('moveGroup')}><IconButton size="small" onClick={(e) => handleMoveGroup(e, group)}><LaunchIcon fontSize="inherit" /></IconButton></Tooltip>
                    <Tooltip title={t('ungroup')}><IconButton size="small" onClick={(e) => handleUngroup(e, group.id)}><WorkspacesOutlinedIcon fontSize="inherit" /></IconButton></Tooltip>
                    <Tooltip title={t('closeGroup')}><IconButton size="small" onClick={(e) => handleCloseGroup(e, group.id)}><CloseIcon fontSize="inherit" /></IconButton></Tooltip>
                  </Box>
                </ListItemButton>
              )}
              <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
                {tabsInGroup.map((tab) => {
                  const hasMuteIcon = tab.audible;
                  const actionsWidth = (
                    (actions?.showCopyUrl ? 1 : 0) +
                    (actions?.showDuplicateTab ? 1 : 0) +
                    (actions?.showCloseTab ? 1 : 0) +
                    (hasMuteIcon ? 1 : 0)
                  ) * 32;

                  return (
                    <ListItemButton
                      key={tab.id}
                      selected={tab.active}
                      onClick={() => handleSwitchToTab(tab.id)}
                      sx={{
                        pl: group ? 4 : 2,
                        minHeight: '40px',
                        borderLeft: '4px solid',
                        borderLeftColor: tab.active ? 'primary.main' : 'transparent',
                        bgcolor: tab.active ? 'action.selected' : (group ? alpha(groupColorMap[group.color], 0.1) : 'transparent'),
                        '&:hover': { bgcolor: group ? alpha(groupColorMap[group.color], 0.2) : 'action.hover' },
                        '& .actions': {
                          width: 0,
                          overflow: 'hidden',
                          opacity: 0,
                          pointerEvents: 'none',
                        },
                        '&:hover .actions': {
                          width: `${actionsWidth}px`,
                          opacity: 1,
                          pointerEvents: 'auto',
                        }
                      }}
                      onMouseEnter={() => setHoveredTabId(tab.id!)}
                      onMouseLeave={() => setHoveredTabId(null)}
                    >
                      <ListItemIcon sx={{ minWidth: 32, flexShrink: 0 }}>
                        <IconButton size="small" onClick={(e) => handleTogglePin(e, tab)} onMouseDown={e => e.stopPropagation()}>
                          {tab.pinned ? 
                            <PushPinIcon fontSize="small" sx={{ color: 'text.secondary' }} /> :
                            (hoveredTabId === tab.id ? 
                              <PushPinOutlinedIcon fontSize="small" /> :
                              <img src={`https://www.google.com/s2/favicons?domain=${getHostname(tab.url)}&sz=16`} width="16" height="16" alt="" />
                            )
                          }
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText 
                        primary={tab.title} 
                        primaryTypographyProps={{ noWrap: true, fontWeight: tab.active ? 'bold' : 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }} 
                        sx={{ flexGrow: 1, pr: 1, minWidth: 0 }}
                      />
                      <Box className="actions" sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {hasMuteIcon && (
                          <Tooltip title={tab.mutedInfo?.muted ? t('unmuteTab') : t('muteTab')}>
                            <IconButton size="small" onClick={(e) => handleToggleMute(e, tab)}>
                              {tab.mutedInfo?.muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title={t('copyUrl')}><IconButton size="small" onClick={(e) => handleCopyUrl(e, tab.url)}><LinkIcon fontSize="small" /></IconButton></Tooltip>
                        {actions?.showDuplicateTab && <Tooltip title={t('duplicateTab')}><IconButton size="small" onClick={(e) => handleDuplicateTab(e, tab.id)}><FilterNoneIcon fontSize="small" /></IconButton></Tooltip>}
                        {actions?.showCloseTab && <Tooltip title={t('closeTab')}><IconButton size="small" onClick={(e) => handleCloseTab(e, tab.id)}><CloseIcon fontSize="small" /></IconButton></Tooltip>}
                      </Box>
                    </ListItemButton>
                  );
                })}
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};