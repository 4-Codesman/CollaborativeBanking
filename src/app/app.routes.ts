import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { Settings } from './pages/settings/settings.component';
import { StokvelComponent } from './pages/stokvel/stokvel.component';
import { CStokvelComponent } from './pages/stokvel/CreateStokvel/Cstokvel.component';
import { VStokvelComponent } from './pages/stokvel/ViewStokvel/Vstokvel.component';
import { JStokvelComponent } from './pages/stokvel/JoinStokvel/Jstokvel.component';
import { AccountSettings } from './pages/account-settings/account-settings';
import { TransactionHistory } from '@pages/transaction-history/transaction-history';


export const routes: Routes = [
  { path: '', component: LandingComponent }, // this is the homepage
  { path: 'settings', component: Settings },
  { path: 'home', component: HomeComponent },
  { path: 'stokvel', component: StokvelComponent },
  {path: 'stokvel/create', component: CStokvelComponent},
  {path: 'stokvel/view', component: VStokvelComponent},
  {path: 'stokvel/join', component: JStokvelComponent},
  {path: 'account-settings', component: AccountSettings },
  { path: 'transaction-history', component: TransactionHistory }
];
