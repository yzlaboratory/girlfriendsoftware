import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, input, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { SelectButtonModule } from "primeng/selectbutton";
import { ToggleButtonModule } from "primeng/togglebutton";
import { newTask, Project } from "./dto";

@Component({
  selector: "app-task-creater",
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
    ToggleButtonModule,
  ],
  host: {
    class:
      "flex flex-col min-w-56 max-w-80 w-1/3 bg-white p-6 rounded-md border-1 border-slate-200 border-solid",
  },
  template: `
    <form
      [formGroup]="taskForm"
      (ngSubmit)="emitTask()"
      class="w-full">
      <div class="flex flex-col gap-2 py-2">
        <label for="task">Todo</label>
        <input
          id="task"
          type="text"
          pInputText
          formControlName="name"
          aria-describedby="username-help" />
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
      <div class="flex flex-col gap-2 py-2">
        <label for="private">Typ</label>
        <p-toggleButton
          id="work"
          formControlName="work"
          onLabel="Schleith"
          onIcon="pi pi-briefcase"
          offIcon="pi pi-home"
          offLabel="Privat" />
      </div>
      <div class="flex w-full flex-col gap-2 py-2">
        <label for="project">Projekt</label>
        <p-dropdown
          [options]="projects()"
          formControlName="project"
          placeholder=""
          [editable]="true"
          optionLabel="name"
          optionValue="id"
          [style]="{ width: '100%' }" />
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
  newTask: OutputEmitterRef<newTask> = output();
  projects = input<Project[]>();

  taskForm = this.formBuilder.group({
    name: ["", Validators.required],
    priority: [1, Validators.required],
    due: this.formBuilder.control<Date | null>(null),
    project: [""],
    work: [true],
  });
  priorityState = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
  ];

  constructor(private formBuilder: FormBuilder) {}

  emitTask() {
    this.newTask.emit({
      name: this.taskForm.get("name")?.value,
      priority: this.taskForm.get("priority")?.value,
      due: this.taskForm.get("due")?.value,
      project: this.taskForm.get("project")?.value,
      isPrivate: !this.taskForm.get("work")?.value,
    });
    this.taskForm.reset({
      name: "",
      priority: 1,
      due: null,
      project: "",
      work: true,
    });
  }
}
