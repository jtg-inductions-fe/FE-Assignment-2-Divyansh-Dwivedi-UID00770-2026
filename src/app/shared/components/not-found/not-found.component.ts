import { Component } from '@angular/core';

import { APP_ROUTES } from '@core/constants/app-routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  protected readonly APP_ROUTES = APP_ROUTES;
}
