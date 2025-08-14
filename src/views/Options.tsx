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
import type { SelectChangeEvent } from '@mui/material/Select';
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

  // Toggle modułów
  const handleModuleToggle =
    (moduleName: 'openTabsList' | 'newTab') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!settings) return;
      const newSettings: AppSettings = {
        ...settings,
        [moduleName]: { ...settings[moduleName], enabled: event.target.checked },
      };
      setSettings(newSettings);
      DataService.saveSettings(newSettings);
    };

  // Zmiana akcji OpenTabsList
  const handleActionChange =
    (actionName: keyof AppSettings['openTabsList']['actions']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!settings) return;
      const newSettings: AppSettings = {
        ...settings,
        openTabsList: {
          ...settings.openTabsList,
          actions: {
            ...settings.openTabsList.actions,
            [actionName]: event.target.checked,
          },
        },
      };
      setSettings(newSettings);
      DataService.saveSettings(newSettings);
    };

  // Zmiana motywu
  const handleThemeChange = (event: SelectChangeEvent) => {
    if (!settings) return;
    const newTheme = event.target.value as AppSettings['theme'];
    const newSettings: AppSettings = { ...settings, theme: newTheme };
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };

  if (!settings) return <Typography>{t('loading')}</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settingsTitle')}
      </Typography>

      {/* Wybór motywu */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('theme')}
        </Typography>
        <FormControl fullWidth>
          <InputLabel>{t('themeMode')}</InputLabel>
          <Select
            value={settings.theme}
            label={t('themeMode')}
            onChange={handleThemeChange}
          >
            <MenuItem value="light">{t('theme_light')}</MenuItem>
            <MenuItem value="dark">{t('theme_dark')}</MenuItem>
            <MenuItem value="system">{t('theme_system')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      <SettingsModuleCard
        // UWAGA: title to teraz KLUCZ, nie literal — patrz defaultSettings
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
