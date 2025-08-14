// src/components/Footer.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export const Footer: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Update the date state every second
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleSettingsClick = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  };

  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderTop: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
          {timeString}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {dateString}
        </Typography>
      </Box>
      <IconButton size="small" onClick={handleSettingsClick} title="Settings">
        <SettingsIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};