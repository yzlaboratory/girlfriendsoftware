import { Injectable } from '@nestjs/common';
import { eq, isNotNull, isNull } from "drizzle-orm";
import { DrizzleService } from "../drizzle.service";
import { project, task } from "../schema";
import { TaskDTO } from "./dto/task.dto";

@Injectable()
export class TasksService {

  constructor(private readonly drizzleService: DrizzleService) {}

  create(newTask: TaskDTO) {
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

  findAll(done: boolean) {
    console.log(done);
    if(done) {
      return this.drizzleService.db
      .select()
      .from(task)
      .innerJoin(project, eq(task.project, project.id)).where(isNotNull(task.done));
    } else {
      return this.drizzleService.db
      .select()
      .from(task)
      .innerJoin(project, eq(task.project, project.id)).where(isNull(task.done));
    }
  }

  findOne(id: number) {
    return this.drizzleService.db.select().from(task).where(eq(task.id, id));
  }

  update(updatedTask: TaskDTO) {
    console.log(updatedTask);
    this.drizzleService.db
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
}
