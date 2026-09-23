import { Component, inject, OnInit } from '@angular/core'; // Added OnInit
import { Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Added ActivatedRoute

import { MatChipInputEvent } from '@angular/material/chips';

import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import {
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleById,
} from '@core/models/article.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);

  isEditMode = false;
  articleId: string | null = null;

  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    image: new FormControl('', [Validators.required]),
    tags: new FormArray<FormControl<string | null>>([]),
  });

  get tags() {
    return this.articleForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.articleId;

    if (this.isEditMode && this.articleId) {
      this.articleService.getArticleById(this.articleId).subscribe({
        next: (response: GetArticleById) => {
          const article = response.data;

          this.tags.clear();

          if (article.tags && Array.isArray(article.tags)) {
            article.tags.forEach((tag: string) => {
              this.tags.push(new FormControl(tag));
            });
          }

          this.articleForm.patchValue(article);
        },
        error: (error) => {
          this.notificationService.error(error.error?.message || 'Failed to fetch article data');
        },
      });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = event.value.trim();
    this.tags.push(new FormControl(value));
    event.chipInput.clear();
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    const requestData = this.articleForm.value as CreateArticleRequest;

    if (this.isEditMode && this.articleId) {
      this.articleService.updateArticle(this.articleId, requestData).subscribe({
        next: (response: CreateArticleResponse) => {
          this.notificationService.success(response.message);
        },
        error: (error) => {
          this.notificationService.error(error.error.message);
        },
      });
    } else {
      this.articleService.createArticle(requestData).subscribe({
        next: (response: CreateArticleResponse) => {
          this.notificationService.success(response.message);
        },
        error: (error) => {
          this.notificationService.error(error.error.message);
        },
      });
    }
  }
}
