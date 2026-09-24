import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { ArticleService } from '@core/services/article.service';
import { UserProfileResponse } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { NotificationService } from '@core/services/notification.service';
import { APP_ROUTES } from '@core/constants/app-routes';
import {
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleById,
} from '@core/models/article.model';

@Component({
  selector: 'app-create-update-article',
  templateUrl: './create-update-article.component.html',
  styleUrl: './create-update-article.component.scss',
})
export class CreateUpdateArticleComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  userProfile?: UserProfileResponse;
  article?: GetArticleById;
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
      this.userService.getUserProfile().subscribe({
        next: (response: UserProfileResponse) => {
          this.userProfile = response;
        },
        error: (error) => {
          this.notificationService.error(error.error.message);
        },
      });

      this.articleService.getArticleById(this.articleId).subscribe({
        next: (response: GetArticleById) => {
          this.article = response;

          if (this.userProfile?.data.username !== this.article.data.author) {
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
    this.router.navigate([APP_ROUTES.DASHBOARD.MY_ARTICLES]);
  }
  onCancel(): void {
    this.router.navigate([APP_ROUTES.DASHBOARD.MY_ARTICLES]);
  }
}
