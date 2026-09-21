import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_ROUTES } from '@core/constants/api-routes';
import { STORAGE_KEYS } from '@core/constants/storage-keys';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, request).pipe(
      // used to perform side effects on an observable stream without changing data flow
      tap((response: LoginResponse) => {
        if (response.data.token) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        }
      })
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ROUTES.AUTH.REGISTER, request).pipe(
      tap((response: RegisterResponse) => {
        if (response.data.token) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;
  }
}
