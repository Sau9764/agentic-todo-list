import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
// import { Todo } from './entities/todo.entity';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Todo]),
    LoggerModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
