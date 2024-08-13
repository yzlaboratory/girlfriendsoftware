import { DatePipe, NgClass } from "@angular/common";
import { Component, input } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { TaskWithProject } from "./dto";

@Component({
  selector: "app-task-list-finished",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DataViewModule,
    NgClass,
    TagModule,
    CheckboxModule,
    FormsModule,
    DatePipe,
  ],
  host: {
    class:
      "flex flex-col w-1/3 bg-white px-6 rounded-md border-1 border-slate-200 border-solid",
  },
  template: `
    <main>
      @for (item of tasks(); track $index) {
        <article
          class="flex h-36 flex-row content-center justify-between py-6"
          [ngClass]="{
            '': !$first,
          }">
          <section class="flex h-full w-2/3 flex-col justify-between">
            <div class="flex h-max flex-col">
              <div class="text-lg">{{ item.task.name }}</div>
              <div class="text-xs text-slate-500">{{ item.project.name }}</div>
            </div>
            <div class="f=lex h-min w-min flex-col">
              @if (item.task.due !== null) {
                <div class="flex h-max w-max flex-row py-1">
                  <i
                    class="pi-calendar-clock pi text-s relative bottom-px pr-px text-slate-500"></i>
                  <span class="h-max w-max text-xs text-slate-500">
                    {{ item.task.due | date: "short" }}
                  </span>
                </div>
              }
              <div class="flex h-min w-full flex-row justify-between space-x-1">
                <p-tag
                  class="h-min w-max"
                  [value]="'Prio ' + item.task.priority"
                  severity="warning"
                  icon="pi pi-exclamation-circle" />
                @if (item.task.private) {
                  <p-tag
                    class="h-min w-max"
                    severity="success"
                    value="Privat"
                    icon="pi pi-home" />
                } @else {
                  <p-tag
                    class="h-min w-max"
                    severity="success"
                    value="Schleith"
                    icon="pi pi-briefcase" />
                }
              </div>
            </div>
          </section>
        </article>
      }
    </main>
  `,
})
export class FinishedTasksComponent {
  tasks = input<TaskWithProject[]>();
}
