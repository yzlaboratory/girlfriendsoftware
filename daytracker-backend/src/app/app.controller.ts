import {
  Body,
  Controller,
  Get,
  Post
} from "@nestjs/common";
import { DrizzleService } from "../drizzle.service";
import { project } from "../schema";

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

  @Post("projects")
  createProject(@Body("name") name: string) {
    console.log(name);
    return this.drizzleService.db
      .insert(project)
      .values({ name: name })
      .returning({ id: project.id });
  }
}
