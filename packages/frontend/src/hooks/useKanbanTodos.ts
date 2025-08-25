import { useCallback, useEffect, useState } from 'react';
import { KanbanTodo, TodoStatus } from '../types/kanban';
import { todoService } from '../services/todoService';
import { useApp } from '../context/AppContext';

export interface UseKanbanTodos {
  todos: KanbanTodo[];
  create: (todo: Partial<KanbanTodo>) => void;
  update: (id: string, updates: Partial<KanbanTodo>) => void;
  deleteTodo: (id: string) => void;
  move: (id: string, status: TodoStatus, newIndex: number) => void;
}

export const useKanbanTodos = (): UseKanbanTodos => {
  const [todos, setTodos] = useState<KanbanTodo[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { setLoading } = useApp();

  const loadTodos = () => {
    const allTodos = todoService.getAll();
    setTodos(allTodos);
  };

  // Detect client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initial load with loading state - only on client
  useEffect(() => {
    if (!isClient) return;
    
    let isMounted = true;
    
    setLoading(true);
    
    // Add a delay to show the loader
    const timer = setTimeout(() => {
      if (isMounted) {
        try {
          loadTodos();
        } catch (error) {
          console.error('Error loading todos:', error);
        } finally {
          setLoading(false);
        }
      }
    }, 500);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timer);
      setLoading(false);
    };
  }, [isClient]); // Only run when client is ready

  const create = (todo: Partial<KanbanTodo>) => {
    todoService.create(todo);
    loadTodos(); // Directly load todos without the refresh delay
  };

  const update = (id: string, updates: Partial<KanbanTodo>) => {
    todoService.update(id, updates);
    loadTodos(); // Directly load todos without the refresh delay
  };

  const deleteTodo = (id: string) => {
    todoService.delete(id);
    loadTodos(); // Directly load todos without the refresh delay
  };

  const move = (id: string, status: TodoStatus, newIndex: number) => {
    todoService.move(id, status, newIndex);
    loadTodos(); // Directly load todos without the refresh delay
  };

  return { todos, create, update, deleteTodo, move };
};
