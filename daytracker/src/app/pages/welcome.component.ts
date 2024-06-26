import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "daytracker-welcome",
  standalone: true,
  imports: [AsyncPipe, PanelModule, ButtonModule],
  host: {
    class:
      "flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32",
  },
  template: `
    <main class="mx-auto flex-1">
      <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div class="card justify-content-center flex">
          <p-panel header="Tägliche Information" [toggleable]="true">
            <ng-template pTemplate="footer">
              <div class="flex flex-wrap content-center justify-between gap-3">
                <i class="pi pi-heart" style="color: #10B99A"></i>
                <span class="content-center" style="color: #10B99A">
                  dein Herzbär
                </span>
              </div>
            </ng-template>
            <p>
              Hallo mein Schatz, <br />
              Ich wünsche dir einen tollen und erfolgreichen Arbeitstag.
              Hoffentlich kann dir dieses Tool ein wenig dabei helfen.
            </p>
          </p-panel>
        </div>
      </section>
      <section class="py-8 md:py-12 lg:py-24"></section>
    </main>
  `,
})
export class WelcomeComponent {
  constructor() {}
}
