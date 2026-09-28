import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Article } from '@core/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;
  @Input() showActions = false;

  @Output() update = new EventEmitter<Article>();
  @Output() delete = new EventEmitter<Article>();

  onDeleteClick(event: MouseEvent, article: Article): void {
    event.stopPropagation();
    this.delete.emit(article);
  }
}
