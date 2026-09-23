import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APP_ROUTES } from '@core/constants/app-routes';
import { STORAGE_KEYS } from '@core/constants/storage-keys';

import {
  Article,
  DeleteArticleResponse,
  GetUserArticlesResponse,
} from '@core/models/article.model';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.scss',
})
export class MyArticlesComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  protected readonly APP_ROUTES = APP_ROUTES;
  private readonly user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');

  articles: Article[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.articleService.getUserArticles().subscribe({
      next: (response: GetUserArticlesResponse) => {
        this.articles = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.error('Failed to load articles');
        this.isLoading = false;
      },
    });
  }

  deleteCurrentArticle(articleId: string): void {
    this.articleService.deleteArticle(articleId).subscribe({
      next: (response: DeleteArticleResponse) => {
        this.notificationService.success(response.message);
        this.articles = this.articles.filter((article) => article.id !== articleId);
      },
      error: () => {
        this.notificationService.error('Unable to delete article');
      },
    });
  }

  updateArticle(articleId: string): void {
    this.router.navigate([APP_ROUTES.DASHBOARD.UPDATE_ARTICLE, articleId]);
  }
}
