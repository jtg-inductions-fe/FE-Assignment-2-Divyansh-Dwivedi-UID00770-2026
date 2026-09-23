import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ROUTES } from '@core/constants/api-routes';
import { UserProfileResponse } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  getUserProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(API_ROUTES.USERS.USER_PROFILE);
  }
}
