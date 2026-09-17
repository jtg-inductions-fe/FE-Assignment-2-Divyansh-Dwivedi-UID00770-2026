import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from '@shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

@NgModule({
  declarations: [DashboardComponent, MyArticlesComponent, ArticleDetailComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule,
    MatChipsModule,
  ],
})
export class DashboardModule {}
