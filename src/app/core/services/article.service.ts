import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

import { GetArticlesResponse } from '@core/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly apiUrl = `${environment.baseUrl}/articles`;
  private readonly http = inject(HttpClient);

  getArticles(page = 1, pageSize = 20): Observable<GetArticlesResponse> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<GetArticlesResponse>(this.apiUrl, { params });
  }
}
