import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { usernameAlphanumericValidator } from '@shared/validators/username.validator';
import { NotificationService } from '@core/services/notification.service';
import { passwordValidator } from '@shared/validators/password.validator';
import { RegisterRequest, AuthResponse } from '@core/models/auth.model';
import { APP_ROUTES } from '@core/constants/app-routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  protected readonly APP_ROUTES = APP_ROUTES;

  hidePassword = true;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      usernameAlphanumericValidator(),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      passwordValidator(),
    ]),
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
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
