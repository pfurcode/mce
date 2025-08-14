// src/components/SettingsModuleCard.tsx

import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SettingsModuleCardProps {
  title: string;
  description: string;
  version: string;
  enabled: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export const SettingsModuleCard: React.FC<SettingsModuleCardProps> = ({
  title,
  description,
  version,
  enabled,
  onToggle,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" component="h2">{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {description}
          </Typography>
        </Box>
        <FormControlLabel
          control={<Switch checked={enabled} onChange={onToggle} />}
          label={t('moduleEnabled')}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ pl: 1, opacity: enabled ? 1 : 0.5 }}>
        {children}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" color="text.secondary">
        {t('version')}: {version}
      </Typography>
    </Paper>
  );
};