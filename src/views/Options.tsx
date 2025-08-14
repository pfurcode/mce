// src/views/Options.tsx

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
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

  // Type-safe handler for modules with an 'enabled' property
  const handleModuleToggle = (moduleName: 'openTabsList' | 'newTab') => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    const newSettings = {
      ...settings,
      [moduleName]: { ...settings[moduleName], enabled: event.target.checked },
    };
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };

  const handleActionChange = (actionName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  if (!settings) return <Typography>Loading...</Typography>;
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>{t('settingsTitle')}</Typography>
      <SettingsModuleCard /* ...props remain the same */ >
        <FormGroup>
          {/* Add the new Switch for tab grouping */}
          <FormControlLabel
            control={
              <Switch
                checked={settings.openTabsList.behavior.enableTabGrouping}
                onChange={handleBehaviorChange('enableTabGrouping')}
                disabled={!settings.openTabsList.enabled}
              />
            }
            label={t('enableTabGroupingLabel')}
          />
          <Divider sx={{ my: 1 }} />
          <FormControlLabel /* ...for showCopyUrl */ />
          <FormControlLabel /* ...for showDuplicateTab */ />
        </FormGroup>
      </SettingsModuleCard>
    </Container>
  );
};