import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.config,
      panelClass: ['success-snackbar'],
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.config,
      panelClass: ['error-snackbar'],
    });
  }
}
