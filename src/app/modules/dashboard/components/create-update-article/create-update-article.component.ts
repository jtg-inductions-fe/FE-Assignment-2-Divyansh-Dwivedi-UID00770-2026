import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { ArticleService } from '@core/services/article.service';
import { UserStore } from '@core/services/user-store.service';
import { NotificationService } from '@core/services/notification.service';
import { APP_ROUTES } from '@core/constants/app-routes';
import { CreateArticleRequest, ArticleResponse } from '@core/models/article.model';

@Component({
  selector: 'app-create-update-article',
  templateUrl: './create-update-article.component.html',
  styleUrl: './create-update-article.component.scss',
})
export class CreateUpdateArticleComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);
  protected readonly APP_ROUTES = APP_ROUTES;

  article?: ArticleResponse;
  isEditMode = false;
  articleId: string | null = null;

  articleForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
    shortDescription: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(50)],
      nonNullable: true,
    }),
    image: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    tags: new FormArray<FormControl<string>>([]),
  });

  get tags() {
    return this.articleForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.articleId;

    if (this.isEditMode && this.articleId) {
      this.articleService.getArticleById(this.articleId).subscribe({
        next: (response: ArticleResponse) => {
          this.article = response;

          const currentUser = this.userStore.userProfile();
          if (currentUser?.username !== this.article.data.author) {
            this.notificationService.error('You can only edit your own articles');
            this.router.navigate([APP_ROUTES.DASHBOARD.BASE]);
          }
          this.tags.clear();

          if (this.article.data.tags && Array.isArray(this.article.data.tags)) {
            this.article.data.tags.forEach((tag: string) => {
              this.tags.push(new FormControl(tag));
            });
          }

          this.articleForm.patchValue(this.article.data);
        },
        error: (error) => {
          this.notificationService.error(error.error?.message || 'Failed to fetch article data');
          this.router.navigate([APP_ROUTES.NOT_FOUND]);
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

    const requestData: CreateArticleRequest = this.articleForm.getRawValue();

    const articleAction$ =
      this.isEditMode && this.articleId
        ? this.articleService.updateArticle(this.articleId, requestData)
        : this.articleService.createArticle(requestData);

    articleAction$.subscribe({
      next: (response: ArticleResponse) => {
        this.notificationService.success(response.message);
        this.router.navigate([APP_ROUTES.DASHBOARD.MY_ARTICLES]);
      },
      error: (error) => {
        this.notificationService.error(error.error.message);
      },
    });
  }

  fileName = '';

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;
    this.fileName = file.name;
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      this.articleForm.controls.image.setValue(base64);
    };

    reader.readAsDataURL(file);
  }
}
