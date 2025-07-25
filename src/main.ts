import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  // ✅ Correct key
    provideAuth(() => getAuth())                                          // ✅ Auth provider
  ]
}).catch((err) => console.error(err));
