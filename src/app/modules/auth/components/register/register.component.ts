import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { usernameAlphanumericValidator } from '../../../../shared/validators/username.validator';
import { NotificationService } from '../../../../core/services/notification.service';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { RegisterRequest, RegisterResponse } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

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
      next: (response: RegisterResponse) => {
        this.notificationService.success(response.message);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.notificationService.error(error.error.message);
      },
    });
  }
}
