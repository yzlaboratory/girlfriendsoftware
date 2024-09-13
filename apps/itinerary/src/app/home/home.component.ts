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
export class HomeComponent {
  //set height properly in parent containers
  //then set min-width 100% on img
  //maybe crop image a little to avoid stretching
}
