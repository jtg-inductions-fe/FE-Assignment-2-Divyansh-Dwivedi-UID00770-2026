import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { LoginRequest, AuthResponse } from '@core/models/auth.model';
import { APP_ROUTES } from '@core/constants/app-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  protected readonly APP_ROUTES = APP_ROUTES;

  hidePassword = true;

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (response: AuthResponse) => {
        this.notificationService.success(response.message);
        this.router.navigate([APP_ROUTES.DASHBOARD]);
      },
      error: (error) => {
        this.notificationService.error(error.error.message);
      },
    });
  }
}
