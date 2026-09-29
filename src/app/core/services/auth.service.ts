import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { APP_ROUTES } from '@core/constants/app-routes';
import { API_ROUTES } from '@core/constants/api-routes';
import { STORAGE_KEYS } from '@core/constants/storage-keys';
import { UserStore } from '@core/services/user-store.service';

import { LoginRequest, AuthResponse, RegisterRequest } from '@core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ROUTES.USERS.LOGIN, request).pipe(
      // used to perform side effects on an observable stream without changing data flow
      tap((response: AuthResponse) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        this.userStore.setUser(response.data.user);
      })
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_ROUTES.USERS.REGISTER, request).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        this.userStore.setUser(response.data.user);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    this.userStore.clearUser();
    this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
  }
}
