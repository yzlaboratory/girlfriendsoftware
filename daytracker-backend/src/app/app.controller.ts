import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DrizzleService } from "../drizzle.service";
import { projects, tasks } from "../schema";
import { TaskDTO } from "./dto/task.dto";

@Controller()
export class AppController {
  constructor(private readonly drizzleService: DrizzleService) {}

  @Get()
  getTTTASD() {
    return this.drizzleService.db.select().from(projects);
  }

  @Get("projects")
  getProjects() {
    return this.drizzleService.db.select().from(projects);
  }

  @Get("tasks")
  getTasks() {
    return this.drizzleService.db.select().from(tasks);
  }

  @Put("task")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      skipMissingProperties: true,
    }),
  )
  updateTasks(@Body() task: TaskDTO) {
    console.log(task);
    return this.drizzleService.db
      .update(tasks)
      .set({
        name: task.name,
        priority: task.priority,
        project: task.project,
        done: task.done,
        due: task.due,
        private: task.isPrivate,
      })
      .where(eq(tasks.id, task.id))
      .returning({ id: tasks.id });
  }

  @Get("tasks/:id")
  getTask(@Param("id") id: number) {
    return this.drizzleService.db.select().from(tasks).where(eq(tasks.id, id));
  }

  @Post("projects")
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  Project(@Body("name") names: string) {
    console.log(names);
    return this.drizzleService.db
      .insert(projects)
      .values({ name: names })
      .returning({ id: projects.id });
  }

  @Post("tasks")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      skipMissingProperties: true,
    }),
  )
  createTask(@Body() task: TaskDTO) {
    return this.drizzleService.db
      .insert(tasks)
      .values({
        name: task.name,
        project: task.project,
        priority: task.priority,
        due: task.due,
        private: task.isPrivate,
      })
      .returning();
  }
}
