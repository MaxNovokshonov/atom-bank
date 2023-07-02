import { NgModule, Provider } from '@angular/core';
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
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ExchangePageComponent } from './pages/exchange-page/exchange-page.component';
import { CurrencyComponent } from './pages/exchange-page/currency/currency.component';
import { ExchangeFormComponent } from './pages/exchange-page/exchange-form/exchange-form.component';
import { RateStreamComponent } from './pages/exchange-page/rate-stream/rate-stream.component';
import { AtmPageComponent } from './pages/atm-page/atm-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { IncludesPipe } from './services/includes.pipe';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { SortPipe } from './services/sort.pipe';
import { NoTransactionsComponent } from './components/no-transactions/no-transactions.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

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
    TransferHistoryComponent,
    DetailsPageComponent,
    ExchangePageComponent,
    CurrencyComponent,
    ExchangeFormComponent,
    RateStreamComponent,
    AtmPageComponent,
    NotFoundPageComponent,
    LoaderComponent,
    IncludesPipe,
    SortPipe,
    NoTransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({ echarts }),
    AngularYandexMapsModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
