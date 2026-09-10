import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FE-Assignment-2-Divyansh-Dwivedi-UID00770-2026';

  private http = inject(HttpClient);
}
