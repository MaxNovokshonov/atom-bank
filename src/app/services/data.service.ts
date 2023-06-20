import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Account, AccountResponse, AccountsResponse, Transfer} from "../interfaces/interfaces";

const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

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
}
