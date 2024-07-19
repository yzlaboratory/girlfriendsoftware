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
import { project, task } from "../schema";
import { TaskDTO } from "./dto/task.dto";

@Controller()
export class AppController {
  constructor(private readonly drizzleService: DrizzleService) {}

  @Get()
  getTTTASD() {
    return this.drizzleService.db.select().from(project);
  }

  @Get("projects")
  getProjects() {
    return this.drizzleService.db.select().from(project);
  }

  @Get("tasks")
  getTasks() {
    return this.drizzleService.db
      .select()
      .from(task)
      .innerJoin(project, eq(task.project, project.id));
  }

  @Put("task")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      skipMissingProperties: true,
    }),
  )
  updateTasks(@Body() updatedTask: TaskDTO) {
    console.log(updatedTask);
    return this.drizzleService.db
      .update(task)
      .set({
        name: updatedTask.name,
        priority: updatedTask.priority,
        project: updatedTask.project,
        done: updatedTask.done,
        due: updatedTask.due,
        private: updatedTask.private,
      })
      .where(eq(task.id, updatedTask.id))
      .returning({ id: task.id });
  }

  @Get("tasks/:id")
  getTask(@Param("id") id: number) {
    return this.drizzleService.db.select().from(task).where(eq(task.id, id));
  }

  @Post("projects")
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  Project(@Body("name") name: string) {
    console.log(name);
    return this.drizzleService.db
      .insert(project)
      .values({ name: name })
      .returning({ id: project.id });
  }

  @Post("tasks")
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      skipMissingProperties: true,
    }),
  )
  createTask(@Body() newTask: TaskDTO) {
    return this.drizzleService.db
      .insert(task)
      .values({
        name: newTask.name,
        project: newTask.project,
        priority: newTask.priority,
        due: newTask.due,
        private: newTask.private,
      })
      .returning();
  }
}
