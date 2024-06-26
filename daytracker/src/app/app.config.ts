import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideClientHydration } from "@angular/platform-browser";
import { provideFileRouter } from "@analogjs/router";

import { provideTrpcClient } from "../trpc-client";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideTrpcClient(),
  ],
};
