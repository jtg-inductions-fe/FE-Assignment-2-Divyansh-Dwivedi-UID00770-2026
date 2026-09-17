import { ErrorHandler, Injectable } from '@angular/core';
import { inject } from '@angular/core';

import { NotificationService } from '@core/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);
  handleError(error: unknown): void {
    console.error('Global runtime error:', error);
    this.notificationService.error('An unexpected error occured!');
  }
}
