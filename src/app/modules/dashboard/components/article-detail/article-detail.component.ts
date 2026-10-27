import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Article, ArticleResponseData } from '@core/models/article.model';
import { ArticleService } from '@core/services/article.service';
import { APP_ROUTES } from '@core/constants/app-routes';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly articleService = inject(ArticleService);
  protected readonly APP_ROUTES = APP_ROUTES;
  private readonly location = inject(Location);

  isLoading = true;
  articleId = 1;

  article: Article | null = null;

  ngOnInit(): void {
    this.loadArticle();
  }

  private loadArticle(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.articleId = idParam ? Number(idParam) : 1;

    this.articleService.getArticleById(this.articleId).subscribe({
      next: (response: ArticleResponseData) => {
        this.article = response;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate([APP_ROUTES.NOT_FOUND], { skipLocationChange: true });
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
