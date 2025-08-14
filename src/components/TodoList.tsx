// src/components/TodoList.tsx

import React, { useState, useEffect } from 'react';
import { DataService } from '../services/DataService';
import type { Todo } from '../types/todo';

// Import Material-UI components
import {
  Box,
  List,
  ListItem,
  Checkbox,
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Load todos from storage when the component mounts
  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await DataService.get('todos', []);
      setTodos(storedTodos);
    };
    loadTodos();
  }, []);

  // Function to save the entire list of todos to storage
  const saveTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
    DataService.set('todos', updatedTodos);
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: crypto.randomUUID(), // Modern way to get a unique ID
      text: newTodoText.trim(),
      completed: false,
      priority: newTodoPriority,
    };

    saveTodos([...todos, newTodo]);
    setNewTodoText(''); // Reset input field
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 500, m: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        My Tasks
      </Typography>

      {/* Form to add a new todo */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          fullWidth
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <FormControl size="small">
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTodoPriority}
            label="Priority"
            onChange={(e) => setNewTodoPriority(e.target.value as never)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddTodo}>Add</Button>
      </Box>

      {/* List of existing todos */}
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <Typography sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'text.secondary' : 'text.primary' }}>
              {todo.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};