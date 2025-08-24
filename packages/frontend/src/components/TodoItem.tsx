import React from 'react';
import { Todo } from '@agentic-todo-list/shared';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        todo.completed 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-white border-gray-300 hover:border-gray-400'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 
                className={`text-lg font-medium truncate ${
                  todo.completed 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-900'
                }`}
                title={todo.title}
              >
                {todo.title}
              </h3>
            </div>
            <span 
              className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${priorityColors[todo.priority]}`}
            >
              {priorityLabels[todo.priority]}
            </span>
          </div>
          
          {todo.description && (
            <p 
              className={`mt-2 text-sm line-clamp-2 ${
                todo.completed 
                  ? 'text-gray-400' 
                  : 'text-gray-600'
              }`}
            >
              {todo.description}
            </p>
          )}
          
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Created: {formatDate(todo.createdAt)}</span>
            <span>Updated: {formatDate(todo.updatedAt)}</span>
            {todo.dueDate && (
              <span className={`font-medium ${
                new Date(todo.dueDate) < new Date() && !todo.completed
                  ? 'text-red-600'
                  : ''
              }`}>
                Due: {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
          {onEdit && (
            <button
              onClick={() => onEdit(todo)}
              className="btn btn-secondary text-sm"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="btn btn-danger text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
