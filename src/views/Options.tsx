// src/views/Options.tsx

import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

export const Options: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material Chrome Extension Settings
        </Typography>
        <Typography variant="body1">
          This is the main options page. We will add configuration settings here.
        </Typography>
      </Paper>
    </Container>
  );
};