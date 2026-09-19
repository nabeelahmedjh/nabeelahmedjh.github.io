import { APP_INITIALIZER, ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { routes } from './app.routes';
import { ConfigService } from './config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({
      scrollPositionRestoration: 'top',
    })),
    {
      provide: APP_INITIALIZER,
      multi: true,
      // Defer injection until the initializer runs to avoid early DI cycles
      useFactory: () => () => inject(ConfigService).load(),
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const iconLibrary = inject(FaIconLibrary);
        return () => {
          // Add all icon packs to the library
          iconLibrary.addIconPacks(fas, far, fab);
        };
      },
    },
  ]
};
