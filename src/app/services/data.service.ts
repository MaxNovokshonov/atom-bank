import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Account,
  AccountResponse,
  AccountsResponse,
  AtmResponse,
  CodesResponse,
  CurrencyResponse,
  Transfer,
} from '../interfaces/interfaces';
import { mainUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<AccountsResponse> {
    return this.http.get<AccountsResponse>(`${mainUrl.BASE_URL}accounts`);
  }

  getAccountByID(id: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${mainUrl.BASE_URL}account/${id}`);
  }

  createNewAccount(data: string): Observable<Account> {
    return this.http.post<Account>(`${mainUrl.BASE_URL}create-account`, data);
  }

  createTransfer(data: Transfer): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(`${mainUrl.BASE_URL}transfer-funds`, data);
  }

  getAllCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`${mainUrl.BASE_URL}currencies`);
  }

  getCurrenciesCodes(): Observable<CodesResponse> {
    return this.http.get<CodesResponse>(`${mainUrl.BASE_URL}all-currencies`);
  }

  createExchange(data: Transfer): Observable<CurrencyResponse> {
    return this.http.post<CurrencyResponse>(`${mainUrl.BASE_URL}currency-buy`, data);
  }

  getAtmCoordinates(): Observable<AtmResponse> {
    return this.http.get<AtmResponse>(`${mainUrl.BASE_URL}banks`);
  }
}
