// src/sidepanel.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Sidebar } from './views/Sidebar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>,
);