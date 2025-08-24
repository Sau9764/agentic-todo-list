import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Todo as TodoType } from '@agentic-todo-list/shared';

@Entity('todos')
export class Todo extends BaseEntity implements TodoType {
  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ 
    type: 'enum', 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  })
  priority: 'low' | 'medium' | 'high';

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;
}
