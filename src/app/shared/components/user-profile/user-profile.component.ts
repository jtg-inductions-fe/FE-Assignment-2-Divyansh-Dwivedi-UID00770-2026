import { Component, inject } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly authService = inject(AuthService);
  readonly user = this.authService.user;

  onLogout() {
    this.authService.logout();
  }
}
