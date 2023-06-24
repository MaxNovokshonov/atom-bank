import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  Account,
  AccountResponse,
  AccountsResponse, Atm, AtmResponse, CodesResponse,
  CurrencyResponse,
  Transfer
} from "../interfaces/interfaces";

// const BASE_URL = 'http://localhost:3000/'
const BASE_URL = 'https://coin-maxnovokshonov.amvera.io/'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getAllAccounts(): Observable<AccountsResponse> {
    return this.http.get<AccountsResponse>(`${BASE_URL}accounts`)
  }

  getAccountByID(id: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${BASE_URL}account/${id}`)
  }

  createNewAccount(data: any): Observable<Account> {
    return this.http.post<Account>(`${BASE_URL}create-account`, data)
  }

  createTransfer(data: Transfer): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(`${BASE_URL}transfer-funds`, data)
  }

  getAllCurrencies(): Observable<CurrencyResponse> {
    return this.http.get<CurrencyResponse>(`${BASE_URL}currencies`)
  }

  getCurrenciesCodes(): Observable<CodesResponse> {
    return this.http.get<CodesResponse>(`${BASE_URL}all-currencies`)
  }

  createExchange(data: Transfer): Observable<CurrencyResponse> {
    return this.http.post<CurrencyResponse>(`${BASE_URL}currency-buy`, data)
  }

  getAtmCoordinates(): Observable<AtmResponse> {
    return this.http.get<AtmResponse>(`${BASE_URL}banks`)
  }

}
