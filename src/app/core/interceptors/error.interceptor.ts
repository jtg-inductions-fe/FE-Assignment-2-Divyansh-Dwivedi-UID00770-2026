import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          authService.logout();
          break;

        case 500:
          console.error('Critical Server Error (500)', error);
          break;
      }

      return throwError(() => error);
    })
  );
};
