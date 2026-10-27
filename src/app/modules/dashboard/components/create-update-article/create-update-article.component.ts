import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { ArticleService } from '@core/services/article.service';
import { UserStore } from '@core/services/user-store.service';
import { NotificationService } from '@core/services/notification.service';
import { APP_ROUTES } from '@core/constants/app-routes';
import { CreateArticleRequest, ArticleResponseData } from '@core/models/article.model';

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

  article?: ArticleResponseData;
  isEditMode = false;
  articleId?: number;

  articleForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
      nonNullable: true,
    }),
    body: new FormControl('', {
      validators: [Validators.required, Validators.minLength(50)],
      nonNullable: true,
    }),
    image: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    tagList: new FormArray<FormControl<string>>([]),
  });

  get tagList() {
    return this.articleForm.get('tagList') as FormArray;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam == null) {
      return;
    }
    if (idParam.trim() == '' || !Number.isInteger(Number(idParam))) {
      this.router.navigate([APP_ROUTES.DASHBOARD.BASE]);
    }
    this.articleId = Number(idParam);
    this.isEditMode = !!this.articleId;

    if (this.isEditMode && this.articleId) {
      this.articleService.getArticleById(this.articleId).subscribe({
        next: (response: ArticleResponseData) => {
          this.article = response;

          const currentUser = this.userStore.userProfile();
          if (currentUser?.id !== this.article.author.authorId) {
            this.notificationService.error('You can only edit your own articles');
            this.router.navigate([APP_ROUTES.DASHBOARD.BASE]);
          }
          this.tagList.clear();

          if (this.article.tagList && Array.isArray(this.article.tagList)) {
            this.article.tagList.forEach((tag: string) => {
              this.tagList.push(new FormControl(tag));
            });
          }

          this.articleForm.patchValue(this.article);
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
    this.tagList.push(new FormControl(value));
    event.chipInput.clear();
  }

  removeTag(index: number): void {
    this.tagList.removeAt(index);
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
      next: () => {
        if (this.isEditMode) {
          this.notificationService.success('Article Updated Successfully');
        } else {
          this.notificationService.success('Article Created Successfully');
        }
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
