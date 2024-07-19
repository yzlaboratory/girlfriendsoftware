import { DatePipe, NgClass } from "@angular/common";
import { Component, computed, input, output, Signal } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { DataViewModule } from "primeng/dataview";
import { TagModule } from "primeng/tag";
import { Task, TaskWithProject } from "./dto";

@Component({
  selector: "app-task-list",
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
    <main [formGroup]="closedTaskForm()">
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

          <section class="flex flex-col justify-evenly">
            <p-checkbox
              class="self-end"
              binary
              label="Fertig"
              [formControlName]="item.task.id" />
          </section>
        </article>
      }
    </main>
  `,
})
export class TaskListComponent {
  tasks = input<TaskWithProject[]>();
  tasksClosed = output<Task[]>();
  tasksClosedPresave: Task[] = [];
  test = false;
  timer!: ReturnType<typeof setTimeout>;

  closedTaskForm!: Signal<FormRecord>;
  constructor(private formBuilder: FormBuilder) {
    this.closedTaskForm = computed(() => {
      const temp = this.formBuilder.record({});

      const tasks: TaskWithProject[] | undefined = this.tasks();
      console.log(tasks);
      if (tasks != undefined && tasks.length > 0) {
        for (const item of tasks) {
          console.log(item.task.private);
          temp.addControl(
            item.task.id.toString(),
            new FormControl<boolean>(item.task.done !== null),
          );
        }
      }
      temp.valueChanges.subscribe((value) =>
        this.checkTasksAndRestartTimer(value, tasks),
      );
      return temp;
    });
  }

  checkTasksAndRestartTimer(
    idToValue: Partial<{
      [x: string]: unknown;
    }>,
    tasks: TaskWithProject[] | undefined,
  ) {
    console.log(idToValue);
    console.log(tasks);
    clearTimeout(this.timer);
    if (tasks != undefined) {
      for (const item of tasks) {
        if (this.closedTaskForm().get(item.task.id.toString())?.dirty) {
          item.task.done = this.closedTaskForm().get(item.task.id.toString())
            ?.value
            ? new Date()
            : null;
          this.tasksClosedPresave.push(item.task);
        } else {
          //TODO:: possibly remove task from q
        }
      }
    }
    if (this.tasksClosedPresave.length > 0) {
      this.timer = setTimeout(() => this.emitClosedList(), 2500);
    }
  }

  emitClosedList() {
    //TODO this.tasksclosedpresave has some strange behaviour concerning its length
    console.log(this.tasksClosedPresave);
    this.tasksClosed.emit(this.tasksClosedPresave);
    this.tasksClosedPresave = [];
    console.log(this.tasksClosedPresave);
  }
}
