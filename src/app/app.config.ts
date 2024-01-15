import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StoreModule, provideStore } from '@ngrx/store';
import { usersFeature } from './+state/app.reducers';
import { provideEffects } from '@ngrx/effects';
import * as effects from './+state/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
export const appConfig: ApplicationConfig = {
  providers: [
    LocalStorageService,
    provideRouter(routes),
    provideNoopAnimations(),
    provideStore({ [usersFeature.name]: usersFeature.reducer }),
    provideEffects(effects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    importProvidersFrom(HttpClientModule),
  ],
};
