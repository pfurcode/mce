// src/newtab.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { NewTab } from './views/NewTab';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NewTab />
  </React.StrictMode>,
);