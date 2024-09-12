import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
  selector: "app-saturday",
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: "./saturday.component.html",
  styleUrl: "./saturday.component.css",
})
export class SaturdayComponent {}
