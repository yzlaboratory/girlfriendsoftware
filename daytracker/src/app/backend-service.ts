import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
  ): Observable<Task[]> {
    return this.client.post<Task[]>(environment.apiUrl + "/api/tasks", {
      name: name,
      priority: priority,
      project: project,
      due: due,
    });
  }
}
