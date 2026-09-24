import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TextFieldModule } from '@angular/cdk/text-field';

import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CreateUpdateArticleComponent } from './components/create-article/create-update-article.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyArticlesComponent,
    ArticleDetailComponent,
    CreateUpdateArticleComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TextFieldModule,
  ],
})
export class DashboardModule {}
