import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PageEvent } from '@angular/material/paginator';

import { APP_ROUTES } from '@core/constants/app-routes';
import { Article, ArticleResponse, GetUserArticlesResponse } from '@core/models/article.model';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from '@shared/constants/pagination.constants';
import { ArticleFilters } from '@shared/components/side-drawer/side-drawer.component';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.scss',
})
export class MyArticlesComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  protected readonly APP_ROUTES = APP_ROUTES;
  protected readonly pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;
  protected readonly defaultPageSize = DEFAULT_PAGE_SIZE;

  articles: Article[] = [];
  isLoading = true;

  totalItems = 0;
  pageSize = this.defaultPageSize;
  currentPage = 1;

  searchTerm = '';
  tagFilter = '';
  isFilterDrawerOpen = false;

  get hasActiveFilters(): boolean {
    return Boolean(this.tagFilter);
  }

  ngOnInit(): void {
    const queryTag = this.route.snapshot.queryParamMap.get('tag');
    const querySearch = this.route.snapshot.queryParamMap.get('search');

    if (queryTag) {
      this.tagFilter = queryTag;
    }
    if (querySearch) {
      this.searchTerm = querySearch;
    }

    this.loadArticles();
  }

  private loadArticles(): void {
    this.isLoading = true;
    this.articleService
      .getUserArticles(this.currentPage, this.pageSize, this.searchTerm, this.tagFilter)
      .subscribe({
        next: (response: GetUserArticlesResponse) => {
          this.articles = response.articles;
          this.totalItems = response.articles_count;
          this.isLoading = false;
        },
        error: () => {
          this.notificationService.error('Failed to load articles');
          this.isLoading = false;
        },
      });
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm || null,
        tag: this.tagFilter || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadArticles();
  }

  openFilterDrawer(): void {
    this.isFilterDrawerOpen = true;
  }

  closeFilterDrawer(): void {
    this.isFilterDrawerOpen = false;
  }

  onApplyFilters(filters: ArticleFilters): void {
    this.tagFilter = filters.tag;
    this.currentPage = 1;
    this.isFilterDrawerOpen = false;
    this.updateQueryParams();
    this.loadArticles();
  }

  onResetFilters(): void {
    this.tagFilter = '';
    this.currentPage = 1;
    this.isFilterDrawerOpen = false;
    this.updateQueryParams();
    this.loadArticles();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadArticles();
  }

  deleteCurrentArticle(articleId: number): void {
    const hasConfirmed = window.confirm('Are you sure you want to delete this article?');
    if (!hasConfirmed) {
      return;
    }

    this.articleService.deleteArticle(articleId).subscribe({
      next: (response: ArticleResponse) => {
        this.notificationService.success(response.message);
        this.articles = this.articles.filter((article) => article.id !== articleId);
        this.totalItems = Math.max(0, this.totalItems - 1);
      },
      error: () => {
        this.notificationService.error('Unable to delete article');
      },
    });
  }

  updateArticle(articleId: number): void {
    this.router.navigate([APP_ROUTES.DASHBOARD.UPDATE_ARTICLE, articleId]);
  }

  goBack(): void {
    this.location.back();
  }
}
