// src/components/TodoList.tsx

import React, { useState, useEffect } from 'react';
import { DataService } from '../services/DataService';
import type { Todo } from '../types/todo';

// Import necessary components from Material-UI
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
  MenuItem,
  ListItemText // Ensure ListItemText is imported
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    const loadTodos = async () => {
      const settings = await DataService.getSettings();
      setTodos(settings.todos);
    };
    loadTodos();
  }, []);

  const saveTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
    DataService.saveSettings({ todos: updatedTodos });
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      completed: false,
      priority: newTodoPriority,
    };
    saveTodos([...todos, newTodo]);
    setNewTodoText('');
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
    <Paper elevation={0} sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
        My Tasks
      </Typography>
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
        <FormControl size="small" sx={{minWidth: 100}}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTodoPriority}
            label="Priority"
            onChange={(e) => setNewTodoPriority(e.target.value as any)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddTodo}>Add</Button>
      </Box>
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
            <ListItemText sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'text.secondary' : 'text.primary' }}>
              {todo.text}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};