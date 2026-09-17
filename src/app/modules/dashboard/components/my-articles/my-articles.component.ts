import { Component, inject, OnInit } from '@angular/core';

import { Article, GetUserArticlesResponse } from '@core/models/article.model';
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
}
