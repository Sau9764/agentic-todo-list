import { useState, useCallback } from 'react';
import { Todo } from '@agentic-todo-list/shared';

// Mock data
const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project setup',
    description: 'Set up the monorepo structure and configure all packages',
    completed: true,
    priority: 'high',
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add JWT authentication with login and registration',
    completed: false,
    priority: 'medium',
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Write documentation',
    description: 'Create comprehensive API and user documentation',
    completed: false,
    priority: 'low',
    dueDate: new Date('2024-01-25'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all todos
  const getAllTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.todos.getAll();
      // setTodos(response.data.data || []);
      
      // For now, just simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setTodos(initialTodos);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create todo
  const createTodo = useCallback(async (todoData: Partial<Todo>) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.todos.create(todoData);
      // const newTodo = response.data.data;
      
      // For now, create locally
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: todoData.title || '',
        description: todoData.description,
        completed: false,
        priority: todoData.priority || 'medium',
        dueDate: todoData.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id: string, updates: Partial<Todo>) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.todos.update(id, updates);
      // const updatedTodo = response.data.data;
      
      // For now, update locally
      setTodos(prev => prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // await api.todos.delete(id);
      
      // For now, delete locally
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await api.todos.toggleComplete(id);
      // const updatedTodo = response.data.data;
      
      // For now, toggle locally
      setTodos(prev => prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ));
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    todos,
    loading,
    error,
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  };
};
