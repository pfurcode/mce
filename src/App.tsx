// src/App.tsx

import React from 'react';
import { TodoList } from './components/TodoList';

/**
 * The main App component for the MCE application.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      {/* For now, we are just displaying the TodoList directly.
          Later this will be part of the NewTab view. */}
      <TodoList />
    </div>
  );
}

export default App;