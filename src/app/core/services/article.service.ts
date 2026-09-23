import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetArticlesResponse } from '@core/models/article.model';
import { API_ROUTES } from '@core/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly http = inject(HttpClient);

  getArticles(page = 1, pageSize = 20): Observable<GetArticlesResponse> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<GetArticlesResponse>(API_ROUTES.ARTICLE.ARTICLES, { params });
  }
}
