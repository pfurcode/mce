// src/types/todo.ts

/**
 * Defines the structure for a single to-do item.
 */
export interface Todo {
  id: string; // A unique identifier for each todo
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  link?: string; // Optional URL associated with the todo
}