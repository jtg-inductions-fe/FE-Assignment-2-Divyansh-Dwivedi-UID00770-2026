import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';

@NgModule({
  declarations: [NotFoundComponent, UserProfileComponent, ArticleCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
  ],
  exports: [NotFoundComponent, CommonModule, UserProfileComponent, ArticleCardComponent],
})
export class SharedModule {}
