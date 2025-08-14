import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { TodoList } from '../components/TodoList';
import { ClockWidget } from '/components/ClockWidget';

export const NewTab: React.FC = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* We can have a main area here later */}
          </Grid>
          <Grid item xs={12} md={4}>
            <ClockWidget />
          </Grid>
          <Grid item xs={12} md={6}>
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