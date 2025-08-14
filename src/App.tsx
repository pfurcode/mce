// src/App.tsx

import React from 'react';
import { Popup } from './views/popup'; // Correctly import the Popup view

/**
 * The main App component for the MCE application.
 * This instance is loaded by index.html for the POPUP VIEW.
 */
const App: React.FC = () => {
  return <Popup />;
};

export default App;