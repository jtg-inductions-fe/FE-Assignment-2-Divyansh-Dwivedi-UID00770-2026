import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  GetArticlesResponse,
  GetUserArticlesResponse,
  GetArticleById,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
} from '@core/models/article.model';

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

  getUserArticles(): Observable<GetUserArticlesResponse> {
    return this.http.get<GetUserArticlesResponse>(API_ROUTES.ARTICLE.MY_ARTICLES);
  }

  getArticleById(id: string): Observable<GetArticleById> {
    return this.http.get<GetArticleById>(`${API_ROUTES.ARTICLE.ARTICLES}/${id}`);
  }

  createArticle(request: CreateArticleRequest): Observable<CreateArticleResponse> {
    return this.http.post<CreateArticleResponse>(API_ROUTES.ARTICLE.ARTICLES, request);
  }

  deleteArticle(id: string): Observable<DeleteArticleResponse> {
    return this.http.delete<DeleteArticleResponse>(`${API_ROUTES.ARTICLE.ARTICLES}/${id}`);
  }

  updateArticle(id: string, request: CreateArticleRequest): Observable<CreateArticleResponse> {
    return this.http.put<CreateArticleResponse>(`${API_ROUTES.ARTICLE.ARTICLES}/${id}`, request);
  }
}
