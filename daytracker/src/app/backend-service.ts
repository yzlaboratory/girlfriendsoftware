import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Project, Task } from "./dto";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  client = inject(HttpClient);

  //TODO PRIVATE TODO LIST// PRIVATE TASKS FOR WEEKENDS TO SEE DURING THE WEEK
  getProjects(): Observable<Project[]> {
    return this.client.get<Project[]>(environment.apiUrl + "/api/projects");
  }

  getTasks(): Observable<Task[]> {
    return this.client.get<Task[]>(environment.apiUrl + "/api/tasks");
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

  createProject(name: string): Observable<{ id: number }[]> {
    console.log(name);
    return this.client.post<{ id: number }[]>(
      environment.apiUrl + "/api/projects",
      { name: name },
    );
  }

  createTask(
    name: string,
    project: number,
    priority: number,
    due: Date,
    isPrivate: boolean,
  ): Observable<Task[]> {
    console.log(isPrivate);
    return this.client.post<Task[]>(environment.apiUrl + "/api/tasks", {
      name: name,
      priority: priority,
      isPrivate: isPrivate,
      project: project,
      due: due,
    });
  }
}
