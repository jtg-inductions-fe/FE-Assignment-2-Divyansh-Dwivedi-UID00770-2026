import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  GetArticlesResponse,
  GetUserArticlesResponse,
  CreateArticleRequest,
  ArticleResponse,
  ArticleResponseData,
} from '@core/models/article.model';

import { API_ROUTES } from '@core/constants/api-routes';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly http = inject(HttpClient);

  getArticles(
    page = 1,
    pageSize = 20,
    search = '',
    tag = '',
    author = ''
  ): Observable<GetArticlesResponse> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (search) {
      params = params.set('search', search);
    }
    if (tag) {
      params = params.set('tag', tag);
    }
    if (author) {
      params = params.set('author', author);
    }

    return this.http.get<GetArticlesResponse>(API_ROUTES.ARTICLE.ARTICLES, { params });
  }

  getUserArticles(
    page = 1,
    pageSize = 20,
    search = '',
    tag = ''
  ): Observable<GetUserArticlesResponse> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (search) {
      params = params.set('search', search);
    }
    if (tag) {
      params = params.set('tag', tag);
    }

    return this.http.get<GetUserArticlesResponse>(API_ROUTES.ARTICLE.MY_ARTICLES, { params });
  }

  getArticleById(id: number): Observable<ArticleResponseData> {
    return this.http.get<ArticleResponseData>(`${API_ROUTES.ARTICLE.ARTICLES}/${id}`);
  }

  createArticle(request: CreateArticleRequest): Observable<ArticleResponseData> {
    return this.http.post<ArticleResponseData>(API_ROUTES.ARTICLE.ARTICLES, request);
  }

  deleteArticle(id: number): Observable<ArticleResponse> {
    return this.http.delete<ArticleResponse>(`${API_ROUTES.ARTICLE.ARTICLES}/${id}`);
  }

  updateArticle(id: number, request: CreateArticleRequest): Observable<ArticleResponseData> {
    return this.http.patch<ArticleResponseData>(`${API_ROUTES.ARTICLE.ARTICLES}/${id}`, request);
  }
}
