import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { FridayComponent } from "../friday/friday.component";
import { SaturdayComponent } from "../saturday/saturday.component";
import { StartComponent } from "../start/start.component";
import { ThursdayComponent } from "../thursday/thursday.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ThursdayComponent,
    FridayComponent,
    SaturdayComponent,
    StartComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
