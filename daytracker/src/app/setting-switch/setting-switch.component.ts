import { CommonModule } from "@angular/common";
import { Component, output, OutputEmitterRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputSwitchModule } from "primeng/inputswitch";
import { ToggleButtonModule } from "primeng/togglebutton";

@Component({
  selector: "app-setting-switch",
  standalone: true,
  imports: [
    CommonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    ToggleButtonModule,
  ],
  template: `
    <div [formGroup]="formGroup">
      <p-inputSwitch
        formControlName="checked"
        (onChange)="emit()" />
      <label>{{ label }}</label>
    </div>
  `,
  styleUrl: "./setting-switch.component.css",
})
export class SettingSwitchComponent {
  settingChanged: OutputEmitterRef<boolean> = output();
  formGroup = new FormGroup({
    checked: new FormControl<boolean>(false),
  });
  label = "Privat";

  constructor() {
    this.emit();
  }

  emit() {
    console.log(this.formGroup.controls.checked.value);
    const value = this.formGroup.controls.checked.value == true ? true : false;
    this.label = value ? "Schleith" : "Privat";
    this.settingChanged.emit(value);
  }
}
