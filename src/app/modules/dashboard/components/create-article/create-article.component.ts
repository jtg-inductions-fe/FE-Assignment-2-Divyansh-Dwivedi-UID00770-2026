import { Component, inject } from '@angular/core';
import { Validators, FormArray, FormControl, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';

import { ArticleService } from '@core/services/article.service';
import { NotificationService } from '@core/services/notification.service';
import { CreateArticleRequest, CreateArticleResponse } from '@core/models/article.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  private readonly articleService = inject(ArticleService);
  private readonly notificationService = inject(NotificationService);

  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    image: new FormControl('', [Validators.required]),
    tags: new FormArray([]),
  });

  get tags() {
    return this.articleForm.get('tags') as FormArray;
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

    this.articleService.createArticle(this.articleForm.value as CreateArticleRequest).subscribe({
      next: (response: CreateArticleResponse) => {
        this.notificationService.success(response.message);
      },
      error: (error) => {
        this.notificationService.error(error.error.message);
      },
    });
  }
}
