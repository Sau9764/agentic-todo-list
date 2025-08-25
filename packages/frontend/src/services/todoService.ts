import { v4 as uuid } from 'uuid';
import { KanbanTodo, TodoStatus } from '../types/kanban';

// Singleton in-memory store
class TodoService {
  private todos: KanbanTodo[] = [];
  private isInitialized = false;

  constructor() {
    // Don't initialize during SSR to avoid hydration mismatch
  }

  private initializeIfNeeded() {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }
    
    this.isInitialized = true;
    // seed with example todo only on client side
    this.todos = [
      {
        id: 'sample-todo-1',
        title: 'Sample task',
        description: 'You can drag me around',
        status: TodoStatus.NEW,
        priority: 'medium',
        createdAt: new Date('2024-01-10T10:00:00Z'),
        updatedAt: new Date('2024-01-10T10:00:00Z'),
      },
    ];
  }

  getAll(): KanbanTodo[] {
    this.initializeIfNeeded();
    return [...this.todos];
  }

  create(todo: Partial<KanbanTodo>): KanbanTodo {
    this.initializeIfNeeded();
    const newTodo: KanbanTodo = {
      id: uuid(),
      title: todo.title || 'Untitled',
      description: todo.description,
      status: todo.status ?? TodoStatus.NEW,
      priority: todo.priority ?? 'medium',
      dueDate: todo.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as KanbanTodo;
    this.todos.unshift(newTodo);
    return newTodo;
  }

  update(id: string, updates: Partial<KanbanTodo>): KanbanTodo | undefined {
    this.initializeIfNeeded();
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    const updated: KanbanTodo = {
      ...this.todos[index],
      ...updates,
      updatedAt: new Date(),
    };
    this.todos[index] = updated;
    return updated;
  }

  delete(id: string): void {
    this.initializeIfNeeded();
    this.todos = this.todos.filter(t => t.id !== id);
  }

  move(id: string, status: TodoStatus, newIndex: number): void {
    this.initializeIfNeeded();
    const idx = this.todos.findIndex(t => t.id === id);
    if (idx === -1) return;
    const [item] = this.todos.splice(idx, 1);
    item.status = status;
    this.todos.splice(newIndex, 0, item);
  }
}

export const todoService = new TodoService();
