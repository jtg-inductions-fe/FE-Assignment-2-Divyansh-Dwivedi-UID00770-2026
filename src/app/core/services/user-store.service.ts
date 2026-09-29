import { computed, Injectable, signal } from '@angular/core';

import { UserProfile } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _userProfile = signal<UserProfile | null>(null);

  readonly userProfile = this._userProfile.asReadonly();
  readonly isLoaded = computed(() => this._userProfile() !== null);

  setUser(user: UserProfile): void {
    this._userProfile.set(user);
  }

  clearUser(): void {
    this._userProfile.set(null);
  }
}
