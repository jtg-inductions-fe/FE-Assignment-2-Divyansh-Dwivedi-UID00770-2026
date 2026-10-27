import { Component, inject } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { UserStore } from '@core/services/user-store.service';
import { NotificationService } from '@core/services/notification.service';
import { APP_ROUTES } from '@core/constants/app-routes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(UserStore);
  private readonly notificationService = inject(NotificationService);
  protected readonly APP_ROUTES = APP_ROUTES;

  userProfile = this.userStore.userProfile;

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.notificationService.success('Logout Successful');
      },
      error: () => {
        this.notificationService.success('Logout failed');
      },
    });
  }
}
