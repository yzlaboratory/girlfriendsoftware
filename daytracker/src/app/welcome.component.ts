import { AsyncPipe } from "@angular/common";
import { Component, inject, OnDestroy, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import {
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
} from "rxjs";
import { BackendService } from "./backend-service";
import { newTask, Project, Task, TaskWithProject } from "./dto";
import { FinishedTasksComponent } from "./finished-tasks.component";
import { SettingSwitchComponent } from "./setting-switch/setting-switch.component";
import { TaskCreaterComponent } from "./task-creater.component";
import { TaskListComponent } from "./task-list.component";

@Component({
  selector: "app-welcome",
  standalone: true,
  host: {
    class:
      "flex min-h-screen flex-col text-slate-700 bg-zinc-100 px-4 pt-8 pb-32",
  },
  template: `
    <main class="mx-auto w-2/3 flex-1">
      <section class="space-y-12 py-6 md:pb-12 md:pt-10 lg:py-32">
        <div class="card justify-content-center flex">
          <p-panel
            class="w-full"
            header="Tägliche Information"
            [toggleable]="true"
            collapsed="true">
            <ng-template pTemplate="footer">
              <div class="flex flex-wrap content-center justify-between gap-3">
                <i class="pi pi-heart text-primary-500"></i>
                <span class="content-center text-primary-500">
                  dein Herzbär
                </span>
              </div>
            </ng-template>
            <p>
              Hallo mein Schatz,
              <br />
              Ich wünsche dir einen tollen und erfolgreichen Arbeitstag.
              Hoffentlich kann dir dieses Tool ein wenig dabei helfen.
            </p>
          </p-panel>
        </div>
      </section>
      <section class="py-8 md:py-12 lg:py-24">
        <app-task-creater
          (newTask)="handleNewTask($event)"
          [projects]="projects()" />
      </section>
      <section>
        <app-task-list
          (tasksClosed)="saveClosedTasksAndReload($event)"
          [tasks]="openTasks()" />
      </section>
      <section><app-task-list-finished [tasks]="finishedTasks()" /></section>
      <section>
        <app-setting-switch (settingChanged)="changePrivatState($event)" />
      </section>
    </main>
  `,
  imports: [
    AsyncPipe,
    PanelModule,
    ButtonModule,
    TaskCreaterComponent,
    TaskListComponent,
    FinishedTasksComponent,
    SettingSwitchComponent,
  ],
})
export class WelcomeComponent implements OnDestroy {
  //TODO: Finished Task List Daily and Weekly
  //TODO: Tasks groupably by Project
  //TODO: Tasks sortable by priority and due
  //TODO: Tasks highlighted when due is near
  //TODO: Load only tasks with active = false for task list
  //TODO: consider adding icons to form field
  private destroy$ = new Subject<void>();

  private private = signal(false);

  backendService = inject(BackendService);

  private projectsRefresh$ = new Subject<void>();
  projects$: Observable<Project[]> = this.projectsRefresh$.pipe(
    switchMap(() => this.backendService.getProjects()),
    startWith([]),
    shareReplay(1),
  );
  private tasksRefresh$ = new Subject<void>();
  openTasks$: Observable<TaskWithProject[]> = this.tasksRefresh$.pipe(
    switchMap(() => this.backendService.getTasks(false)),
    startWith([]),
    shareReplay(1),
  );
  finishedTasks$: Observable<TaskWithProject[]> = this.tasksRefresh$.pipe(
    switchMap(() => this.backendService.getTasks(true)),
    startWith([]),
    shareReplay(1),
  );
  projects = toSignal(this.projects$, { initialValue: [] });
  openTasks = toSignal(this.openTasks$, { initialValue: [] });
  finishedTasks = toSignal(this.finishedTasks$, { initialValue: [] });
  constructor() {
    this.projectsRefresh$.next();
    this.tasksRefresh$.next();
  }

  handleNewTask(task: newTask) {
    console.log(task);
    if (!isNaN(+Number(task.project))) {
      console.log(task);
      this.backendService
        .createTask(task)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.tasksRefresh$.next());
    } else {
      console.log(task);
      console.log(task.project);
      this.backendService
        .createProject(task.project)
        .pipe(take(1), takeUntil(this.destroy$))
        .subscribe((responseBody) => {
          console.log(responseBody[0].id);
          task.project = responseBody[0].id.toString();
          this.projectsRefresh$.next();
          this.backendService
            .createTask(task)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.tasksRefresh$.next());
        });
    }
  }

  changePrivatState(isPrivate: boolean) {
    this.private.set(isPrivate);
  }

  saveClosedTasksAndReload(tasks: Task[]) {
    console.log(tasks);
    this.backendService
      .updateTasks(tasks)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => this.tasksRefresh$.next());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
