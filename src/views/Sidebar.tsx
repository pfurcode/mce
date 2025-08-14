// src/views/Sidebar.tsx

import React from 'react';
import { Drawer, Divider } from '@mui/material';
import { TodoList } from '../components/TodoList';
import { OpenTabsList } from '../components/OpenTabsList';

export const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        // Use 100% to make the drawer fill the available space
        width: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%', // Also apply to the inner paper element
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
    >
      <OpenTabsList />
      <Divider />
      <TodoList />
    </Drawer>
  );
};