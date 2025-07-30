import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { Settings } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // this is the homepage
  { path: 'settings', component: Settings }
];
