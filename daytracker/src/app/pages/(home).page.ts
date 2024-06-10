import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'daytracker-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <daytracker-analog-welcome/>
  `,
})
export default class HomeComponent {
}
