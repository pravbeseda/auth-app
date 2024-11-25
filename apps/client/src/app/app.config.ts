import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvService } from '@auth-app/env';
import { apiUrlInterceptor } from './interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideClientHydration(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([apiUrlInterceptor])),
        EnvService,
    ],
};
