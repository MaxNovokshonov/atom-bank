import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, User } from '../interfaces/interfaces';
import { mainUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${mainUrl.BASE_URL}login`, user);
  }

  get token() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
