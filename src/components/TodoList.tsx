import React, { useState, useEffect } from 'react';
import { DataService } from '../services/DataService';
import type { Todo } from '../types/todo';

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
  MenuItem,
  ListItemText,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoLink, setNewTodoLink] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTodoDue, setNewTodoDue] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const loadTodos = async () => {
      const settings = await DataService.getSettings();
      setTodos(settings.todos);
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const saveTodos = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
    DataService.saveSettings({ todos: updatedTodos });
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;
    const link = newTodoLink.trim();
    const due = newTodoDue.trim();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      completed: false,
      priority: newTodoPriority,
      ...(link && { link }),
      ...(due && { dueDate: due }),
    };
    saveTodos([...todos, newTodo]);
    setNewTodoText('');
    setNewTodoLink('');
    setNewTodoDue('');
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

  const handlePriorityChange = (
    e: SelectChangeEvent<'low' | 'medium' | 'high'>,
  ) => {
    setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high');
  };

  const getCountdown = (dueDate: string) => {
    const diff = new Date(dueDate).getTime() - currentTime;
    if (diff <= 0) return '0d 0h 0m';
    const minutes = Math.floor(diff / 60000);
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;
    return `${days}d ${hours}h ${mins}m`;
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <TextField
          label="Link"
          variant="outlined"
          size="small"
          fullWidth
          value={newTodoLink}
          onChange={(e) => setNewTodoLink(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <TextField
          label="Due"
          type="datetime-local"
          size="small"
          value={newTodoDue}
          onChange={(e) => setNewTodoDue(e.target.value)}
          InputLabelProps={{ shrink: true }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <FormControl size="small" sx={{minWidth: 100}}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTodoPriority}
            label="Priority"
            onChange={handlePriorityChange}
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
            <ListItemText sx={{ display: 'flex', alignItems: 'center', color: todo.completed ? 'text.secondary' : 'text.primary', textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              {todo.link && (
                <Box
                  component="a"
                  href={todo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={todo.link}
                  sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
                >
                  <LinkIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {(() => {
                      try {
                        return new URL(todo.link!).hostname;
                      } catch {
                        return todo.link!.slice(0, 30);
                      }
                    })()}
                  </Typography>
                </Box>
              )}
              {todo.dueDate && (
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {getCountdown(todo.dueDate)}
                </Typography>
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
