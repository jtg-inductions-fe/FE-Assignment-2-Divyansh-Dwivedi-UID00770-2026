import { Component, inject, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Article, GetArticlesResponse } from '@core/models/article.model';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);

  articles: Article[] = [];
  isLoading = true;

  totalItems = 0;
  pageSize = 8;
  currentPage = 1;

  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.articleService.getArticles(this.currentPage, this.pageSize).subscribe({
      next: (response: GetArticlesResponse) => {
        this.articles = response.data.data;
        this.totalItems = response.data.totalItems;
        this.isLoading = false;
      },
      error: () => {
        this.notificationService.error('Failed to load articles');
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadArticles();
  }
}
