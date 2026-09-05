import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './global-error-handler.service';
import { httpInterceptor } from './core/interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideAnimationsAsync('noop'),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideHttpClient(withInterceptors([httpInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
