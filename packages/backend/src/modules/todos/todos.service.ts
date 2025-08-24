import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggerService } from '../../logger/logger.service';

// Temporary interface for testing without database
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = []; // Temporary in-memory storage

  constructor(
    // @InjectRepository(Todo)
    // private readonly todoRepository: Repository<Todo>,
    private readonly logger: LoggerService,
  ) {}

  async findAll(): Promise<Todo[]> {
    this.logger.info('Fetching all todos');
    return this.todos;
  }

  async findOne(id: string): Promise<Todo> {
    this.logger.info(`Fetching todo with id: ${id}`);
    const todo = this.todos.find(t => t.id === id);
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    this.logger.info('Creating new todo', { title: createTodoDto.title });
    
    const todo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: createTodoDto.completed || false,
      priority: createTodoDto.priority || 'medium',
      dueDate: createTodoDto.dueDate ? new Date(createTodoDto.dueDate) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.todos.push(todo);
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    this.logger.info(`Updating todo with id: ${id}`);
    
    const todo = await this.findOne(id);
    const index = this.todos.findIndex(t => t.id === id);
    
    const updatedTodo: Todo = {
      ...todo,
      ...updateTodoDto,
      dueDate: updateTodoDto.dueDate ? new Date(updateTodoDto.dueDate) : todo.dueDate,
      updatedAt: new Date(),
    };
    
    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  async remove(id: string): Promise<void> {
    this.logger.info(`Deleting todo with id: ${id}`);
    
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    this.todos.splice(index, 1);
  }

  async toggleComplete(id: string): Promise<Todo> {
    this.logger.info(`Toggling completion for todo with id: ${id}`);
    
    const todo = await this.findOne(id);
    const index = this.todos.findIndex(t => t.id === id);
    
    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    
    this.todos[index] = todo;
    return todo;
  }
}
