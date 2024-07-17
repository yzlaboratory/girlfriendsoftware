import { NgClass } from "@angular/common";
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
import { Task } from "./dto";

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
  ],
  host: {
    class:
      "flex flex-col min-w-56 max-w-80 w-1/3 bg-white p-6 rounded-md border-1 border-slate-200 border-solid",
  },
  template: `
    <main>
      <p-checkbox
        binary
        trueValue="true"
        falseValue="false"
        value="true" />
      <p-checkbox
        binary
        value="true" />
      <p-dataView
        #dv
        [value]="tasks()">
        <ng-template
          pTemplate="list"
          let-tasks>
          <div
            class="grid-nogutter col-12 grid"
            [formGroup]="closedTaskForm()">
            @for (item of tasks; track $index) {
              <div
                class="flex-column sm:align-items-center flex gap-3 p-4 sm:flex-row"
                [ngClass]="{
                  'border-top-1 surface-border': !$first,
                }"></div>
              <article class="flex-row">
                <section class="flex-column">
                  <div>{{ item.name }}</div>
                  <div>{{ item.project }}</div>
                  <div class="flex-row">
                    <p-tag
                      [value]="'Prio ' + item.priority"
                      severity="warning" />
                    @if (item.isPrivate) {
                      <p-tag
                        severity="success"
                        value="Privat"
                        icon="pi pi-home" />
                    } @else {
                      <p-tag
                        severity="success"
                        value="Schleith"
                        icon="pi pi-work" />
                    }
                  </div>
                </section>
                <span>{{ item.due }}</span>
                <p-checkbox
                  binary
                  [formControlName]="item.id" />
              </article>
            }
          </div>
        </ng-template>
      </p-dataView>
    </main>
  `,
})
export class TaskListComponent {
  tasks = input<Task[]>();
  tasksClosed = output<Task[]>();
  tasksClosedPresave: Task[] = [];
  test = false;
  timer!: ReturnType<typeof setTimeout>;

  closedTaskForm!: Signal<FormRecord>;
  constructor(private formBuilder: FormBuilder) {
    this.closedTaskForm = computed(() => {
      const temp = this.formBuilder.record({});

      const tasks: Task[] | undefined = this.tasks();
      console.log(tasks);
      if (tasks != undefined && tasks.length > 0) {
        for (const task of tasks) {
          temp.addControl(
            task.id.toString(),
            new FormControl<boolean>(task.done !== null),
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
    tasks: Task[] | undefined,
  ) {
    console.log(idToValue);
    console.log(tasks);
    clearTimeout(this.timer);
    if (tasks != undefined) {
      for (const task of tasks) {
        if (this.closedTaskForm().get(task.id.toString())?.dirty) {
          task.done = this.closedTaskForm().get(task.id.toString())?.value
            ? new Date()
            : null;
          this.tasksClosedPresave.push(task);
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
