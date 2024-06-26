import { Component } from "@angular/core";

import { WelcomeComponent } from "./welcome.component";

@Component({
  selector: "daytracker-home",
  standalone: true,
  imports: [WelcomeComponent],
  template: ` <daytracker-welcome /> `,
})
export default class HomeComponent {}
