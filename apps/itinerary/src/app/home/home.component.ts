import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { ThursdayComponent } from "../thursday/thursday.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, CardComponent, ThursdayComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  //test githook
}
