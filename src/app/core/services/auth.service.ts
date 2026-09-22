import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { APP_ROUTES } from '@core/constants/app-routes';
import { API_ROUTES } from '@core/constants/api-routes';
import { STORAGE_KEYS } from '@core/constants/storage-keys';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@core/models/auth.model';
import { User } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly _user = signal<User | null>(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null')
  );
  readonly user = this._user.asReadonly();

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, request).pipe(
      // used to perform side effects on an observable stream without changing data flow
      tap((response: LoginResponse) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
        this._user.set(response.data.user);
      })
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, request).pipe(
      tap((response: RegisterResponse) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
        this._user.set(response.data.user);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    this._user.set(null);
    this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
  }
}
