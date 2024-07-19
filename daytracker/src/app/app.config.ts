import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import localeDE from "@angular/common/locales/de";
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";

registerLocaleData(localeDE);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "fullDate" },
    },
    {
      provide: LOCALE_ID,
      useValue: "de",
    },
  ],
};
