import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';

import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { apiUrlInterceptor } from '@core/interceptors/api-url.interceptor';

import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, MatToolbarModule],
  providers: [
    provideAnimationsAsync('noop'),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    },
    provideHttpClient(withInterceptors([apiUrlInterceptor, authInterceptor, errorInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
