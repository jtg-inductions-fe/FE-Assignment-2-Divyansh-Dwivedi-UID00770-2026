import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article, GetArticleById } from '@core/models/article.model';
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

  article: Article | null = null;

  ngOnInit(): void {
    this.loadArticle();
  }

  private loadArticle(): void {
    const articleId = this.route.snapshot.paramMap.get('id');

    this.articleService.getArticleById(articleId!).subscribe({
      next: (response: GetArticleById) => {
        this.article = response.data;
      },
      error: () => {
        this.router.navigate([APP_ROUTES.NOT_FOUND], { skipLocationChange: true });
      },
    });
  }
}
