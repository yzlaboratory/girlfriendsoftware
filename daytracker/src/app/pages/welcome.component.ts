import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { Subject, take } from "rxjs";
import { injectTrpcClient } from "../../../src/trpc-client";
import { TaskCreaterComponent } from "./task-creater.component";

@Component({
  selector: "daytracker-welcome",
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
            [toggleable]="true">
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
        <daytracker-task-creater (newTask)="handleNewTask($event)" />
      </section>
    </main>
  `,
  imports: [AsyncPipe, PanelModule, ButtonModule, TaskCreaterComponent],
})
export class WelcomeComponent {
  private _trpc = injectTrpcClient();
  private projectsRefresh$ = new Subject<void>();
  constructor() {}

  handleNewTask($event: any) {
    let projectId = null;
    console.log($event.project);
    console.log(Number($event.project.value));
    console.log(+Number($event.project.value));
    console.log(isNaN(+Number($event.project.value)));
    if (!isNaN(+Number($event.project))) {
      projectId = $event.project;
    } else {
      //create project and use id
      this._trpc.project.create
        .mutate({ name: $event.project })
        .pipe(take(1))
        .subscribe((newProject) => {
          projectId = newProject[0].id;
          this.projectsRefresh$.next();
          console.log(projectId);
        });
    }
  }
}
