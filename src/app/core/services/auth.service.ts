import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { APP_ROUTES } from '@core/constants/app-routes';
import { API_ROUTES } from '@core/constants/api-routes';
import { STORAGE_KEYS } from '@core/constants/storage-keys';
import { UserStore } from '@core/services/user-store.service';

import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '@core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ROUTES.USERS.LOGIN, request).pipe(
      // used to perform side effects on an observable stream without changing data flow
      tap((response: LoginResponse) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token.key);
        this.userStore.setUser(response.user);
      })
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ROUTES.USERS.REGISTER, request).pipe(
      tap((response: RegisterResponse) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token.key);
        this.userStore.setUser(response.user);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;
  }

  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(API_ROUTES.USERS.LOGOUT, null).pipe(
      tap(() => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        this.userStore.clearUser();
        this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
      })
    );
  }
}
