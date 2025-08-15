// src/modules/recentlyClosedTabs/RecentlyClosedTabsSettings.tsx

import React from 'react';
import { FormGroup, FormControlLabel, Switch, TextField } from '@mui/material';
import { SettingsModuleCard } from '../../components/SettingsModuleCard';
import type { AppSettings } from '../../types/settings';
import { useTranslation } from 'react-i18next';

interface Props {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export const RecentlyClosedTabsSettings: React.FC<Props> = ({ settings, onSettingsChange }) => {
  const { t } = useTranslation();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      recentlyClosedTabs: { ...settings.recentlyClosedTabs, enabled: event.target.checked },
    });
  };

  const handleChange = (key: keyof AppSettings['recentlyClosedTabs']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (key === 'maxTabs') ? parseInt(event.target.value) : event.target.checked;
    onSettingsChange({
      ...settings,
      recentlyClosedTabs: { ...settings.recentlyClosedTabs, [key]: value },
    });
  };

  return (
    <SettingsModuleCard
      title={t(settings.recentlyClosedTabs.title)}
      description={t(settings.recentlyClosedTabs.descriptionKey)}
      version={settings.recentlyClosedTabs.version}
      enabled={settings.recentlyClosedTabs.enabled}
      onToggle={handleToggle}
    >
      <FormGroup>
        <TextField
          label={t('maxTabs')}
          type="number"
          value={settings.recentlyClosedTabs.maxTabs}
          onChange={handleChange('maxTabs')}
          disabled={!settings.recentlyClosedTabs.enabled}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Switch checked={settings.recentlyClosedTabs.showTime} onChange={handleChange('showTime')} disabled={!settings.recentlyClosedTabs.enabled} />}
          label={t('showTime')}
        />
      </FormGroup>
    </SettingsModuleCard>
  );
};