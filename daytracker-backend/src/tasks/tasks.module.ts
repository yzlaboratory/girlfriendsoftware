import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DrizzleModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
