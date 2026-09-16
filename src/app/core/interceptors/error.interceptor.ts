import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }

      if (error.status === 500) {
        console.error('Critical Server Error (500) encountered.');
      }

      return throwError(() => error);
    })
  );
};
