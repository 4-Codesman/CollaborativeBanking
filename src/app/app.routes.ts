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

import { FriendsComponent } from './pages/friends/friends.component';
import { SavingsLeagueComponent } from './pages/savings-league/savings-league.component';
import { CreateSavingsLeagueComponent } from './pages/savings-league/create-savings-league/create-savings-league.component';
import { JoinLeagueComponent } from './pages/savings-league/join-league/join-league.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'settings', component: Settings },
  { path: 'home', component: HomeComponent },
  { path: 'stokvel', component: StokvelComponent },
  { path: 'savings-league', component: SavingsLeagueComponent },
  { path: 'stokvel/create', component: CStokvelComponent },
  { path: 'stokvel/view', component: VStokvelComponent },
  { path: 'stokvel/join', component: JStokvelComponent },
  { path: 'account-settings', component: AccountSettings },
  { path: 'transaction-history', component: TransactionHistory },
  { path: 'savings/create', component: CreateSavingsLeagueComponent },
  { path: 'join-league', component: JoinLeagueComponent },


  // ✅ New route for viewing savings leagues
  {
    path: 'savings/view',
    loadComponent: () =>
      import('./pages/savings-league/view-leagues/view-leagues.component').then(
        (m) => m.ViewLeaguesComponent
      )
  },

  { path: 'friends', component: FriendsComponent }
];
