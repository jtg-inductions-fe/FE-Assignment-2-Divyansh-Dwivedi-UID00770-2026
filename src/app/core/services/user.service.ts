import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_ROUTES } from '@core/constants/api-routes';
import { UserMeResponse, UserProfile } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserMeResponse>(API_ROUTES.USERS.USER_PROFILE).pipe(
      map((response) => ({
        id: response.id,
        email: response.email,
        firstName: response.UserDetails.firstName,
        lastModified: response.lastModified,
      }))
    );
  }
}
