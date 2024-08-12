import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { newTask, Project, Task, TaskWithProject } from "./dto";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  client = inject(HttpClient);

  //TODO PRIVATE TODO LIST// PRIVATE TASKS FOR WEEKENDS TO SEE DURING THE WEEK
  getProjects(): Observable<Project[]> {
    return this.client.get<Project[]>(environment.apiUrl + "/api/projects");
  }

  getTasks(): Observable<TaskWithProject[]> {
    return this.client.get<TaskWithProject[]>(
      environment.apiUrl + "/api/tasks",
    );
  }

  updateTasks(tasks: Task[]): Observable<Task[]> {
    const observables$: Observable<Task>[] = [];
    for (const task of tasks) {
      observables$.push(
        this.client.put<Task>(environment.apiUrl + "/api/task", task),
      );
    }
    return combineLatest(observables$);
  }

  createProject(name: string | undefined | null): Observable<{ id: number }[]> {
    console.log(name);
    return this.client.post<{ id: number }[]>(
      environment.apiUrl + "/api/projects",
      { name: name },
    );
  }

  createTask(
    task : newTask
  ): Observable<Task[]> {
    return this.client.post<Task[]>(environment.apiUrl + "/api/tasks", {
      name: task.name,
      priority: task.priority,
      private: task.private,
      project: task.project,
      due: task.due,
    });
  }
}
