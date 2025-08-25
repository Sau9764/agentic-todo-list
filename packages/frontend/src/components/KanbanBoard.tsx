import React, { useState } from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import { KanbanColumn } from './KanbanColumn';
import { TodoHeader } from './TodoHeader';
import { TodoModal } from './TodoModal';
import { ConfirmationDialog } from './ConfirmationDialog';
import { useKanbanTodos } from '../hooks/useKanbanTodos';
import { TodoStatus, KanbanTodo } from '../types/kanban';

const statusOrder: TodoStatus[] = [
  TodoStatus.NEW,
  TodoStatus.TODO,
  TodoStatus.IN_PROGRESS,
  TodoStatus.HOLD,
  TodoStatus.READY,
  TodoStatus.DONE,
];

const statusTitles: Record<TodoStatus, string> = {
  new: 'New',
  todo: 'Todo',
  in_progress: 'In Progress',
  hold: 'Hold',
  ready: 'Ready',
  done: 'Done',
};

export const KanbanBoard: React.FC = () => {
  const { todos, move, update, create, deleteTodo } = useKanbanTodos();

  // Modal states
  const [todoModal, setTodoModal] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    todo?: KanbanTodo | null;
    defaultStatus?: TodoStatus;
  }>({
    isOpen: false,
    mode: 'create',
    todo: null,
    defaultStatus: TodoStatus.NEW,
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    todoId?: string;
    todoTitle?: string;
  }>({
    isOpen: false,
    todoId: undefined,
    todoTitle: undefined,
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // if dropped in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const status = destination.droppableId as TodoStatus;
    move(draggableId, status, destination.index);
  };

  // Modal handlers
  const handleCreateTodo = (todoData: Partial<KanbanTodo>) => {
    create(todoData);
  };

  const handleEditTodo = (todo: KanbanTodo) => {
    setTodoModal({
      isOpen: true,
      mode: 'edit',
      todo: todo,
      defaultStatus: todo.status,
    });
  };

  const handleDeleteTodo = (todo: KanbanTodo) => {
    setDeleteDialog({
      isOpen: true,
      todoId: todo.id,
      todoTitle: todo.title,
    });
  };

  const handleTodoSubmit = (todoData: Partial<KanbanTodo>) => {
    if (todoModal.mode === 'create') {
      create(todoData);
    } else if (todoModal.mode === 'edit' && todoModal.todo) {
      update(todoModal.todo.id, todoData);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.todoId) {
      deleteTodo(deleteDialog.todoId);
    }
  };

  const closeTodoModal = () => {
    setTodoModal({
      isOpen: false,
      mode: 'create',
      todo: null,
      defaultStatus: TodoStatus.NEW,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      todoId: undefined,
      todoTitle: undefined,
    });
  };

  return (
    <>
      {/* Header with inline add form */}
      <TodoHeader onCreateTodo={handleCreateTodo} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-x-auto p-6 h-full min-h-[600px] bg-gray-50 dark:bg-gray-900">
          {statusOrder.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              title={statusTitles[status]}
              todos={todos.filter(t => t.status === status)}
              onEdit={handleEditTodo}
              onDelete={(todoId) => {
                const todo = todos.find(t => t.id === todoId);
                if (todo) handleDeleteTodo(todo);
              }}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Todo Modal */}
      <TodoModal
        isOpen={todoModal.isOpen}
        onClose={closeTodoModal}
        onSubmit={handleTodoSubmit}
        todo={todoModal.todo}
        mode={todoModal.mode}
        defaultStatus={todoModal.defaultStatus}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Todo"
        message={`Are you sure you want to delete "${deleteDialog.todoTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  );
};
