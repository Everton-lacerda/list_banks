import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { routes } from './app.routes';
import { TokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideOAuthClient(),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot()),
    provideHttpClient(withInterceptors([TokenInterceptor])),
  ],
};
