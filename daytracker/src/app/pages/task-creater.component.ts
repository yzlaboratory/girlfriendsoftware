import { waitFor } from "@analogjs/trpc";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, output, OutputEmitterRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { SelectButtonModule } from "primeng/selectbutton";
import { shareReplay, Subject, switchMap } from "rxjs";
import { Task } from "../../schema";
import { injectTrpcClient } from "../../trpc-client";

@Component({
  selector: "daytracker-task-creater",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    AsyncPipe,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
  ],
  host: {
    class:
      "flex flex-col w-1/3 bg-white p-6 rounded-md border-1 border-slate-200 border-solid",
  },
  template: `
    <form
      [formGroup]="taskForm"
      (ngSubmit)="onSubmit()"
      class="w-full">
      <div class="flex flex-col gap-2 py-2">
        <label for="task">Todo</label>
        <input
          id="task"
          type="text"
          pInputText
          formControlName="name" />
      </div>
      <div class="flex flex-col gap-2 py-2">
        <label for="priority">Priorität</label>
        <p-selectButton
          id="priority"
          formControlName="priority"
          [options]="priorityState"
          optionLabel="label"
          optionValue="value" />
      </div>
      <div class="flex w-full flex-col gap-2 py-2">
        <label for="project">Projekt</label>
        @if (projects$ | async; as projects) {
          <p-dropdown
            [options]="projects"
            formControlName="project"
            placeholder=""
            [editable]="true"
            optionLabel="name"
            optionValue="id"
            [style]="{ width: '100%' }" />
        } @else {
          <p-dropdown
            loading="true"
            [style]="{ width: '100%' }" />
        }
      </div>
      <div class="flex flex-col gap-2 py-4">
        <label for="due">Deadline</label>
        <p-calendar
          formControlName="due"
          [iconDisplay]="'input'"
          [showIcon]="true"
          dateFormat="dd.mm.yy"
          [style]="{ width: '100%' }"
          [inputStyle]="{ width: '100%' }" />
      </div>
      <p-button
        type="submit"
        [disabled]="!taskForm.valid"
        label="Submit"
        class="p-button-success self" />
    </form>
  `,
})
export class TaskCreaterComponent {
  private _trpc = injectTrpcClient();
  public projectsRefresh$ = new Subject<void>();

  task: OutputEmitterRef<Task> = output();
  taskForm = new FormGroup({
    name: new FormControl(""),
    priority: new FormControl(1),
    due: new FormControl(""),
    project: new FormControl(""),
  });
  priorityState = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
  ];
  projects$ = this.projectsRefresh$.pipe(
    switchMap(() => this._trpc.project.list.query()),
    shareReplay(1),
  );

  constructor() {
    void waitFor(this.projects$);
    this.projectsRefresh$.next();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.taskForm.value);
  }
}
