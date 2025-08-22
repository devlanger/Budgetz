import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // <-- Add this import
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(), provideCharts(withDefaultRegisterables()) // <-- Add this line
  ]
})
  .catch((err) => console.error(err));
