import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { KanbanTodo } from '../types/kanban';
import { Pencil, Trash2 } from 'lucide-react';

interface KanbanCardProps {
  todo: KanbanTodo;
  index: number;
  onEdit?: (todo: KanbanTodo) => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<KanbanTodo['status'], string> = {
  new: 'border-l-4 border-l-blue-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  todo: 'border-l-4 border-l-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  in_progress: 'border-l-4 border-l-yellow-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  hold: 'border-l-4 border-l-purple-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  ready: 'border-l-4 border-l-teal-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  done: 'border-l-4 border-l-green-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
};

export const KanbanCard: React.FC<KanbanCardProps> = ({
  todo,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className={clsx(
            'p-4 rounded-lg shadow-sm cursor-grab select-none space-y-3 transition-all duration-200',
            statusColors[todo.status],
            snapshot.isDragging && 'ring-2 ring-offset-2 ring-blue-500 shadow-xl rotate-2 cursor-grabbing scale-105',
            !snapshot.isDragging && 'hover:shadow-md hover:-translate-y-1'
          )}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-sm leading-5 text-gray-900 dark:text-gray-100 line-clamp-2" title={todo.title}>
              {todo.title}
            </h3>
            <div className="flex space-x-1">
              {onEdit && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onEdit(todo);
                  }}
                  className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(todo.id);
                  }}
                  className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded-full transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
          {todo.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
              {todo.description}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
};
