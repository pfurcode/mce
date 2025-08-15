// src/views/Options.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Container, Divider, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DataService } from '../services/DataService';
import type { AppSettings } from '../types/settings';
import { useTranslation } from 'react-i18next';
import { OpenTabsListSettings } from '../modules/openTabsList/OpenTabsListSettings';
import { RecentlyClosedTabsSettings } from '../modules/recentlyClosedTabs/RecentlyClosedTabsSettings';

export const Options: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    DataService.getSettings().then(setSettings);
  }, []);

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };
  
  const handleThemeChange = (event: SelectChangeEvent) => {
    if (!settings) return;
    const newTheme = event.target.value as AppSettings['theme'];
    handleSettingsChange({ ...settings, theme: newTheme });
  };

  if (!settings) return <Typography>{t('loading')}</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settingsTitle')}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>{t('theme')}</Typography>
        <FormControl fullWidth>
          <InputLabel>{t('themeMode')}</InputLabel>
          <Select value={settings.theme} label={t('themeMode')} onChange={handleThemeChange}>
            <MenuItem value="light">{t('theme_light')}</MenuItem>
            <MenuItem value="dark">{t('theme_dark')}</MenuItem>
            <MenuItem value="system">{t('theme_system')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      <OpenTabsListSettings settings={settings} onSettingsChange={handleSettingsChange} />
      <RecentlyClosedTabsSettings settings={settings} onSettingsChange={handleSettingsChange} />

    </Container>
  );
};