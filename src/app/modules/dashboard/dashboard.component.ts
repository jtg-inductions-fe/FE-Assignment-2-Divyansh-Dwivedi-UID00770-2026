import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';

import { Article, GetArticlesResponse } from '@core/models/article.model';
import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import { APP_ROUTES } from '@core/constants/app-routes';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from '@shared/constants/pagination.constants';
import { ArticleFilters } from '@shared/components/side-drawer/side-drawer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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
  authorFilter = '';
  isFilterDrawerOpen = false;

  get hasActiveFilters(): boolean {
    return Boolean(this.tagFilter || this.authorFilter);
  }

  ngOnInit(): void {
    const queryTag = this.route.snapshot.queryParamMap.get('tag');
    const queryAuthor = this.route.snapshot.queryParamMap.get('author');
    const querySearch = this.route.snapshot.queryParamMap.get('search');

    if (queryTag) {
      this.tagFilter = queryTag;
    }
    if (queryAuthor) {
      this.authorFilter = queryAuthor;
    }
    if (querySearch) {
      this.searchTerm = querySearch;
    }

    this.loadArticles();
  }

  private loadArticles(): void {
    this.isLoading = true;
    this.articleService
      .getArticles(
        this.currentPage,
        this.pageSize,
        this.searchTerm,
        this.tagFilter,
        this.authorFilter
      )
      .subscribe({
        next: (response: GetArticlesResponse) => {
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
        author: this.authorFilter || null,
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
    this.authorFilter = filters.author;
    this.currentPage = 1;
    this.isFilterDrawerOpen = false;
    this.updateQueryParams();
    this.loadArticles();
  }

  onResetFilters(): void {
    this.tagFilter = '';
    this.authorFilter = '';
    this.currentPage = 1;
    this.closeFilterDrawer();
    this.updateQueryParams();
    this.loadArticles();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadArticles();
  }
}
