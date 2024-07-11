import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";

@Component({
  standalone: true,
  imports: [RouterModule, WelcomeComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "daytracker";
}
