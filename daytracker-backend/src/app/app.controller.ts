import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DrizzleService } from "../drizzle.service";
import { projects, tasks } from "../schema";
import { CreateTaskDto } from "./dto/create-task.dto";

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
    }),
  )
  createTask(@Body() task: CreateTaskDto) {
    // ES5+
    const myDate = new Date("2024-01-06");
    const isoDateString = myDate.toISOString();

    console.log(isoDateString); // 2024-01-06T00:00:00.000Z
    console.log(typeof task.due);
    console.log(task.due instanceof String);
    console.log(task.due instanceof Date);
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
