import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'FE-Assignment-2-Divyansh-Dwivedi-UID00770-2026';

  private http = inject(HttpClient);

  // to test basic interceptor working
  ngOnInit() {
    this.http.get('https://typicode.com').subscribe();
  }
}
