import { NgModule } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TextFieldModule } from '@angular/cdk/text-field';

import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CreateUpdateArticleComponent } from './components/create-update-article/create-update-article.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyArticlesComponent,
    ArticleDetailComponent,
    CreateUpdateArticleComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TextFieldModule,
  ],
})
export class DashboardModule {}
