// src/views/Options.tsx

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';
import { SettingsModuleCard } from '../components/SettingsModuleCard';
import { useTranslation } from 'react-i18next';

export const Options: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  // Handler for module toggles
  const handleModuleToggle = (moduleName: 'openTabsList' | 'newTab') => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    const newSettings = {
      ...settings,
      [moduleName]: { ...settings[moduleName], enabled: event.target.checked },
    };
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };
  
  const handleActionChange = (actionName: keyof AppSettings['openTabsList']['actions']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    const newSettings = {
      ...settings,
      openTabsList: {
        ...settings.openTabsList,
        actions: { ...settings.openTabsList.actions, [actionName]: event.target.checked },
      },
    };
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };

  const handleThemeChange = (event: SelectChangeEvent) => {
    if (!settings) return;
    const newSettings = {
      ...settings,
      theme: event.target.value as 'light' | 'dark' | 'system',
    };
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };

  if (!settings) return <Typography>Loading...</Typography>;
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>{t('settingsTitle')}</Typography>
      
      {/* Theme selection dropdown */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>{t('Theme')}</Typography>
        <FormControl fullWidth>
          <InputLabel>{t('Theme Mode')}</InputLabel>
          <Select
            value={settings.theme}
            label={t('Theme Mode')}
            onChange={handleThemeChange}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="system">System Default</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider />

      <SettingsModuleCard
        title={t(settings.openTabsList.title)}
        description={t(settings.openTabsList.descriptionKey)}
        version={settings.openTabsList.version}
        enabled={settings.openTabsList.enabled}
        onToggle={handleModuleToggle('openTabsList')}
      >
        <FormGroup>
          <Divider sx={{ my: 1 }} />
          <FormControlLabel
            control={
              <Switch
                checked={settings.openTabsList.actions.showCopyUrl}
                onChange={handleActionChange('showCopyUrl')}
                disabled={!settings.openTabsList.enabled}
              />
            }
            label={t('copyUrl')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.openTabsList.actions.showDuplicateTab}
                onChange={handleActionChange('showDuplicateTab')}
                disabled={!settings.openTabsList.enabled}
              />
            }
            label={t('duplicateTab')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.openTabsList.actions.showCloseTab}
                onChange={handleActionChange('showCloseTab')}
                disabled={!settings.openTabsList.enabled}
              />
            }
            label={t('closeTab')}
          />
        </FormGroup>
      </SettingsModuleCard>
    </Container>
  );
};