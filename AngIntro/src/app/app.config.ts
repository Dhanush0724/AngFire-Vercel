import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Ensure this path is correct

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Add other providers as needed
  ],
};
