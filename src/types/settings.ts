// src/types/settings.ts

import type { Todo } from './todo'; // Import the new Todo type

/**
 * Defines the structure for all settings in the MCE application.
 * This interface ensures type safety when getting or setting values.
 */
export interface AppSettings {
  isSidebarEnabled: boolean;
  isNewTabEnabled: boolean;
  todos: Todo[]; // Add the array of todos
}