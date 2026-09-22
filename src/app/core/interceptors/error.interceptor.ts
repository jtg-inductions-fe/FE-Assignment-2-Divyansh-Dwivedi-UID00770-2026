import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { APP_ROUTES } from '@core/constants/app-routes';
import { STORAGE_KEYS } from '@core/constants/storage-keys';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          router.navigate([APP_ROUTES.AUTH.LOGIN]);
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
