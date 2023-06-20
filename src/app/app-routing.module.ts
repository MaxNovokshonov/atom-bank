import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AccountsPageComponent} from "./pages/accounts-page/accounts-page.component";
import {AtmPageComponent} from "./pages/atm-page/atm-page.component";
import {ExchangePageComponent} from "./pages/exchange-page/exchange-page.component";
import {DetailsPageComponent} from "./pages/details-page/details-page.component";
import {AccountInfoPageComponent} from "./pages/account-info-page/account-info-page.component";
import {AuthGuard} from "./services/auth.guard";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/accounts', pathMatch: 'full'},
  {path: 'authorization', component: LoginPageComponent},
  {path: 'accounts', component: AccountsPageComponent, canActivate: [AuthGuard]},
  {path: 'account/:id', component: AccountInfoPageComponent, canActivate: [AuthGuard]},
  {path: 'atm', component: AtmPageComponent, canActivate: [AuthGuard]},
  {path: 'exchange', component: ExchangePageComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DetailsPageComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
