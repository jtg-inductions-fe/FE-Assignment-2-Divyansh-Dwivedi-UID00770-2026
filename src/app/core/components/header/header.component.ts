import { Component } from '@angular/core';

import { APP_ROUTES } from '@core/constants/app-routes';
// import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected APP_ROUTES = APP_ROUTES;
}
