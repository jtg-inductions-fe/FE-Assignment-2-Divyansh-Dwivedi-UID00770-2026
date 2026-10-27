import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SideDrawerComponent } from './components/side-drawer/side-drawer.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    UserProfileComponent,
    ArticleCardComponent,
    SearchBarComponent,
    SideDrawerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatButtonModule,
    NgOptimizedImage,
    NotFoundComponent,
    UserProfileComponent,
    ArticleCardComponent,
    SearchBarComponent,
    SideDrawerComponent,
  ],
})
export class SharedModule {}
