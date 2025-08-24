import React, { useState, useEffect } from 'react';
import { Todo, TODO_PRIORITIES } from '@agentic-todo-list/shared';
import { TodoItem } from './TodoItem';
import { Loading } from './Loading';
import { Error } from './Error';
import { useTodos } from '@/hooks/useTodos';

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TodoList: React.FC = () => {
  const { todos, loading, error, getAllTodos, createTodo, updateTodo, deleteTodo, toggleTodo, clearError } = useTodos();
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
  });

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      await createTodo({
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority,
      });
      setNewTodo({ title: '', description: '', priority: 'medium' });
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  if (loading && todos.length === 0) {
    return <Loading size="lg" text="Loading todos..." className="py-12" />;
  }

  if (error) {
    return <Error message={error} onRetry={getAllTodos} />;
  }

  return (
    <div className="space-y-6">
      {/* Add Todo Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900">Add New Todo</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                className="input mt-1"
                placeholder="Enter todo title"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                className="input mt-1"
                rows={3}
                placeholder="Enter todo description"
                disabled={loading}
              />
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                value={newTodo.priority}
                onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as any })}
                className="input mt-1"
                disabled={loading}
              >
                {Object.entries(TODO_PRIORITIES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {priorityLabels[key as keyof typeof priorityLabels]}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !newTodo.title.trim()}
            >
              {loading ? <Loading size="sm" text="Adding..." /> : 'Add Todo'}
            </button>
          </form>
        </div>
      </div>

      {/* Todo List */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Todos ({todos.length})
            </h2>
            {loading && <Loading size="sm" text="Updating..." />}
          </div>
        </div>
        <div className="card-body">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No todos yet. Add one above!</p>
          ) : (
            <div className="space-y-4">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
