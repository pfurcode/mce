// src/views/Sidebar.tsx

import React from 'react';
import { Drawer, Box, Typography, Divider } from '@mui/material';

// 1. Import the TodoList component
import { TodoList } from '../components/TodoList';

// Define the width of our sidebar
const SIDEBAR_WIDTH = 320;

export const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          MCE Sidebar
        </Typography>
      </Box>
      <Divider />

      {/* 2. Render the TodoList component here */}
      <TodoList />

    </Drawer>
  );
};