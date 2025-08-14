// src/views/NewTab.tsx

import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { TodoList } from '../components/TodoList';

export const NewTab: React.FC = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* We'll place widgets here. Let's start with the TodoList */}
            <TodoList />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Another widget could go here */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};