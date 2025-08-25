import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { KanbanTodo, TodoStatus } from '../types/kanban';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  status: TodoStatus;
  todos: KanbanTodo[];
  title: string;
  onEdit?: (todo: KanbanTodo) => void;
  onDelete?: (id: string) => void;
}

const headerColors: Record<TodoStatus, string> = {
  new: 'bg-blue-600',
  todo: 'bg-gray-600',
  in_progress: 'bg-yellow-600',
  hold: 'bg-purple-600',
  ready: 'bg-teal-600',
  done: 'bg-green-600',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  todos,
  title,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col w-72 max-w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div
        className={clsx(
          'text-sm font-semibold text-white px-4 py-3 rounded-t-lg',
          headerColors[status]
        )}
      >
        {title} ({todos.length})
      </div>
      
      {/* Droppable area */}
      <Droppable droppableId={status} type="card">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              'flex-1 overflow-y-auto p-3 space-y-3 transition-all duration-200 min-h-[400px] rounded-b-lg',
              snapshot.isDraggingOver
                ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600'
                : 'bg-gray-50 dark:bg-gray-900/50'
            )}
          >
            {todos.map((todo, index) => (
              <KanbanCard
                key={todo.id}
                todo={todo}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};