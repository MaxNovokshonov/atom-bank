
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';
import { AccountComponent } from './pages/accounts-page/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountInfoPageComponent } from './pages/account-info-page/account-info-page.component';
import { DetailsHeaderComponent } from './components/details-header/details-header.component';
import { NewTransferComponent } from './pages/account-info-page/new-transfer/new-transfer.component';
import { BalanceDynamicsComponent } from './components/balance-dynamics/balance-dynamics.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    AccountsPageComponent,
    AccountComponent,
    AccountInfoPageComponent,
    DetailsHeaderComponent,
    NewTransferComponent,
    BalanceDynamicsComponent,
    TransferHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
