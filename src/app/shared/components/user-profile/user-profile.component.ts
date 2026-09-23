import { Component, inject, OnInit } from '@angular/core';

import { UserProfileResponse } from '@core/models/user.model';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly notificationService = inject(NotificationService);

  userProfile?: UserProfileResponse;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (response: UserProfileResponse) => {
        this.userProfile = response;
      },
      error: (error) => {
        this.notificationService.error(error.error.message);
      },
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
