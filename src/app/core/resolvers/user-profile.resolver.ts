import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';

import { UserProfile } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { UserStore } from '@core/services/user-store.service';

export const userProfileResolver: ResolveFn<UserProfile | null> = () => {
  const userStore = inject(UserStore);
  const userService = inject(UserService);

  // If signal already has data, skip API call
  if (userStore.isLoaded()) {
    return userStore.userProfile();
  }

  // Otherwise, fetch from API and populate signal
  return userService.getUserProfile().pipe(
    map((response) => {
      userStore.setUser(response.data);
      return response.data;
    })
  );
};
