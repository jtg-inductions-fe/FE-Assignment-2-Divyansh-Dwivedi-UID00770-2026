import { Component, inject } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { APP_ROUTES } from '@core/constants/app-routes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly authService = inject(AuthService);
  readonly user = this.authService.user;
  protected readonly APP_ROUTES = APP_ROUTES;

  onLogout() {
    this.authService.logout();
  }
}
