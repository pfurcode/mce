// src/modules/openTabsList/OpenTabsListSettings.tsx

import React from 'react';
import { FormGroup, FormControlLabel, Switch, Divider } from '@mui/material';
import { SettingsModuleCard } from '../../components/SettingsModuleCard';
import type { AppSettings } from '../../types/settings';
import { useTranslation } from 'react-i18next';

interface Props {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export const OpenTabsListSettings: React.FC<Props> = ({ settings, onSettingsChange }) => {
  const { t } = useTranslation();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      openTabsList: { ...settings.openTabsList, enabled: event.target.checked },
    });
  };

  const handleActionChange = (actionName: keyof AppSettings['openTabsList']['actions']) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      openTabsList: {
        ...settings.openTabsList,
        actions: { ...settings.openTabsList.actions, [actionName]: event.target.checked },
      },
    });
  };

  return (
    <SettingsModuleCard
      title={t(settings.openTabsList.title)}
      description={t(settings.openTabsList.descriptionKey)}
      version={settings.openTabsList.version}
      enabled={settings.openTabsList.enabled}
      onToggle={handleToggle}
    >
      <FormGroup>
        <Divider sx={{ my: 1 }} />
        <FormControlLabel control={<Switch checked={settings.openTabsList.actions.showCopyUrl} onChange={handleActionChange('showCopyUrl')} disabled={!settings.openTabsList.enabled} />} label={t('copyUrl')} />
        <FormControlLabel control={<Switch checked={settings.openTabsList.actions.showDuplicateTab} onChange={handleActionChange('showDuplicateTab')} disabled={!settings.openTabsList.enabled} />} label={t('duplicateTab')} />
        <FormControlLabel control={<Switch checked={settings.openTabsList.actions.showCloseTab} onChange={handleActionChange('showCloseTab')} disabled={!settings.openTabsList.enabled} />} label={t('closeTab')} />
      </FormGroup>
    </SettingsModuleCard>
  );
};