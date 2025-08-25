export enum TodoStatus {
  NEW = 'new',
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  HOLD = 'hold',
  READY = 'ready',
  DONE = 'done',
}

export interface KanbanTodo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
