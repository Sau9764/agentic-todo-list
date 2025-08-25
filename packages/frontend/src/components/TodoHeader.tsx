import React, { useState } from 'react';
import { Plus, Calendar, Flag } from 'lucide-react';
import { KanbanTodo, TodoStatus } from '../types/kanban';

interface TodoHeaderProps {
  onCreateTodo: (todo: Partial<KanbanTodo>) => void;
}

const priorityOptions = [
  { value: 'low' as const, label: 'Low', flagColor: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20', borderColor: 'border-green-200 dark:border-green-700' },
  { value: 'medium' as const, label: 'Medium', flagColor: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', borderColor: 'border-yellow-200 dark:border-yellow-700' },
  { value: 'high' as const, label: 'High', flagColor: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20', borderColor: 'border-red-200 dark:border-red-700' },
];

const statusOptions = [
  { value: TodoStatus.NEW, label: 'New', icon: '🆕', dotColor: 'bg-blue-500' },
  { value: TodoStatus.TODO, label: 'Todo', icon: '📝', dotColor: 'bg-gray-500' },
  { value: TodoStatus.IN_PROGRESS, label: 'In Progress', icon: '⚡', dotColor: 'bg-yellow-500' },
  { value: TodoStatus.HOLD, label: 'Hold', icon: '⏸️', dotColor: 'bg-purple-500' },
  { value: TodoStatus.READY, label: 'Ready', icon: '✅', dotColor: 'bg-teal-500' },
  { value: TodoStatus.DONE, label: 'Done', icon: '🎉', dotColor: 'bg-green-500' },
];

export const TodoHeader: React.FC<TodoHeaderProps> = ({ onCreateTodo }) => {
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
    status: TodoStatus.NEW,
    dueDate: '',
  });

  const [isClient, setIsClient] = useState(false);

  // Ensure client-side hydration is complete
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Get current priority option
  const currentPriority = priorityOptions.find(p => p.value === formData.priority);
  const currentStatus = statusOptions.find(s => s.value === formData.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    const todoData: Partial<KanbanTodo> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    };

    onCreateTodo(todoData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: TodoStatus.NEW,
      dueDate: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Connected Title and Description */}
          <div className={`rounded-lg border-2 transition-colors ${currentPriority?.borderColor || 'border-gray-200 dark:border-gray-700'} ${currentPriority?.bgColor || 'bg-white dark:bg-gray-700'}`}>
            <div className="p-4 space-y-3">
              {/* Title input */}
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full text-lg font-medium bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="What needs to be done?"
              />
              
              {/* Description input - always visible */}
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                rows={2}
                placeholder="Add a description..."
              />
            </div>
          </div>

          {/* Add Button and Controls Row */}
          <div className="flex items-center justify-between">
            {/* Add button */}
            <button
              type="submit"
              disabled={!formData.title.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Todo</span>
            </button>

            {/* Dynamic Status Indicators */}
            <div className="flex items-center space-x-4">
              {/* Priority Flag */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={`Priority: ${currentPriority?.label}`}
                >
                  <Flag className={`w-4 h-4 ${currentPriority?.flagColor || 'text-gray-400'}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{currentPriority?.label}</span>
                </button>
                <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[120px]">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('priority', option.value)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2 ${
                        formData.priority === option.value ? 'bg-gray-50 dark:bg-gray-700' : ''
                      }`}
                    >
                      <Flag className={`w-3 h-3 ${option.flagColor}`} />
                      <span className="text-gray-900 dark:text-gray-100">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={`Status: ${currentStatus?.label}`}
                >
                  <div className={`w-3 h-3 rounded-full ${currentStatus?.dotColor || 'bg-gray-400'}`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{currentStatus?.label}</span>
                </button>
                <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[140px]">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('status', option.value)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2 ${
                        formData.status === option.value ? 'bg-gray-50 dark:bg-gray-700' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${option.dotColor}`}></div>
                      <span className="text-gray-900 dark:text-gray-100">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date - only show when set */}
              <div className="relative group">
                {formData.dueDate ? (
                  <button
                    type="button"
                    className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Due Date"
                  >
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(formData.dueDate).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('dueDate', '')}
                      className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ×
                    </button>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Set Due Date"
                  >
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="p-3">
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      min={isClient ? new Date().toISOString().split('T')[0] : ''}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
