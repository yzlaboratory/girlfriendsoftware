
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query
} from "@nestjs/common";
import { DrizzleService } from "../drizzle.service";
import { TaskDTO } from "./dto/task.dto";
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

  constructor(private readonly drizzleService: DrizzleService, private readonly tasksService: TasksService) {}

  //TODO ValidationPipe global settings
  @Get()
  findAll(@Query('done') done: boolean) {
    return this.tasksService.findAll(done);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.tasksService.findOne(id);
  }

  @Put()
  update(@Body() updatedTask: TaskDTO) {
    return this.tasksService.update(updatedTask);
  }

  @Post()
  create(@Body() newTask: TaskDTO) {
    return this.tasksService.create(newTask);
  }
}
