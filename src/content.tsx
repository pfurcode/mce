// src/content.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Sidebar } from './views/sidebar'; // Import the Sidebar component
import { DataService } from './services/DataService';

// Create a root element to mount the Sidebar component
const root = document.createElement('div');
root.id = 'mce-sidebar-root';
document.body.appendChild(root);

// Function to toggle the sidebar visibility
const toggleSidebar = (isVisible: boolean) => {
  root.style.display = isVisible ? 'block' : 'none';
};

// --- Main Logic ---

// 1. Render the React component into the root element
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);

// 2. Add a listener for storage changes
// This is how the popup "communicates" with the content script
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.isSidebarEnabled) {
    const isVisible = changes.isSidebarEnabled.newValue;
    toggleSidebar(isVisible);
  }
});

// 3. Check the initial state when the page loads
DataService.get('isSidebarEnabled', true).then(isVisible => {
  toggleSidebar(isVisible);
});