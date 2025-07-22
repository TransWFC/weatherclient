import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../shared/constant/shared-constants';
import { LoginRequest, RegisterRequest } from '../../shared/models/auth-request.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<any> {
    return this.http.post(API_URLS.AUTH.LOGIN, request);
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(API_URLS.AUTH.REGISTER, request);
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}