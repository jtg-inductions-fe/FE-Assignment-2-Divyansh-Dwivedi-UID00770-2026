import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { CreateUpdateArticleComponent } from './components/create-article/create-update-article.component';
import { DashboardComponent } from './dashboard.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'my-articles',
    component: MyArticlesComponent,
  },
  {
    path: 'article/:id',
    component: ArticleDetailComponent,
  },
  {
    path: 'create-article',
    component: CreateUpdateArticleComponent,
  },
  {
    path: 'update-article/:id',
    component: CreateUpdateArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
