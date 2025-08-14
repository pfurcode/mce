// src/sidepanel.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Sidebar } from './views/Sidebar';
import { ThemeManager } from './components/ThemeManager';
import './i18n'; // Import the i18n configuration

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeManager>
      <Sidebar />
    </ThemeManager>
  </React.StrictMode>,
);