import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-friday",
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: "./friday.component.html",
  styleUrl: "./friday.component.css",
})
export class FridayComponent {}
