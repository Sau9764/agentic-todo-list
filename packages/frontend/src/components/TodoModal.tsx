import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { KanbanTodo, TodoStatus } from '../types/kanban';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: Partial<KanbanTodo>) => void;
  todo?: KanbanTodo | null;
  mode: 'create' | 'edit';
  defaultStatus?: TodoStatus;
}

const priorityOptions = [
  { value: 'low' as const, label: 'Low', color: 'text-green-600' },
  { value: 'medium' as const, label: 'Medium', color: 'text-yellow-600' },
  { value: 'high' as const, label: 'High', color: 'text-red-600' },
];

const statusOptions = [
  { value: TodoStatus.NEW, label: 'New' },
  { value: TodoStatus.TODO, label: 'Todo' },
  { value: TodoStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TodoStatus.HOLD, label: 'Hold' },
  { value: TodoStatus.READY, label: 'Ready' },
  { value: TodoStatus.DONE, label: 'Done' },
];

export const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  todo,
  mode,
  defaultStatus = TodoStatus.NEW,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: TodoStatus;
    dueDate: string;
  }>({
    title: '',
    description: '',
    priority: 'medium',
    status: defaultStatus,
    dueDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset form when modal opens/closes or todo changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && todo) {
        setFormData({
          title: todo.title,
          description: todo.description || '',
          priority: todo.priority,
          status: todo.status,
          dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
        });
      } else {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          status: defaultStatus,
          dueDate: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, todo, defaultStatus]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const todoData: Partial<KanbanTodo> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    };

    onSubmit(todoData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {mode === 'create' ? 'Create New Todo' : 'Edit Todo'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`input dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter todo title"
                autoFocus
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input resize-none dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                rows={3}
                placeholder="Enter todo description (optional)"
              />
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="input dark:bg-gray-700 dark:text-gray-100"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as TodoStatus)}
                className="input dark:bg-gray-700 dark:text-gray-100"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="input dark:bg-gray-700 dark:text-gray-100"
                min={isClient ? new Date().toISOString().split('T')[0] : ''}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {mode === 'create' ? 'Create Todo' : 'Update Todo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
