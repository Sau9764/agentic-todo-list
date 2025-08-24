import { IsString, IsOptional, IsBoolean, IsEnum, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TODO_PRIORITIES } from '@agentic-todo-list/shared';

export class CreateTodoDto {
  @ApiProperty({ description: 'Todo title', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ description: 'Todo description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Todo completion status', default: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({ 
    description: 'Todo priority level', 
    enum: TODO_PRIORITIES,
    default: 'medium'
  })
  @IsOptional()
  @IsEnum(TODO_PRIORITIES)
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({ description: 'Due date for the todo' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
