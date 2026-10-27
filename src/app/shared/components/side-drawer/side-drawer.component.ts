import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ArticleFilters {
  tag: string;
  author: string;
}

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrl: './side-drawer.component.scss',
})
export class SideDrawerComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() showAuthor = true;
  @Input() currentTag = '';
  @Input() currentAuthor = '';

  @Output() closeDrawer = new EventEmitter<void>();
  @Output() applyFilters = new EventEmitter<ArticleFilters>();
  @Output() resetFilters = new EventEmitter<void>();

  tagControl = new FormControl('');
  authorControl = new FormControl('');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTag']) {
      this.tagControl.setValue(this.currentTag ?? '');
    }
    if (changes['currentAuthor']) {
      this.authorControl.setValue(this.currentAuthor ?? '');
    }
  }

  hasFilterValues(): boolean {
    const tag = this.tagControl.value?.trim();
    const author = this.authorControl.value?.trim();
    return Boolean(tag || author);
  }

  hasActiveAppliedFilters(): boolean {
    return Boolean(this.currentTag || this.currentAuthor);
  }

  onApply(): void {
    if (!this.hasFilterValues()) {
      return;
    }

    this.applyFilters.emit({
      tag: this.tagControl.value?.trim() ?? '',
      author: this.authorControl.value?.trim() ?? '',
    });
  }

  onReset(): void {
    this.tagControl.setValue('');
    this.authorControl.setValue('');
    this.resetFilters.emit();
  }

  onClose(): void {
    this.closeDrawer.emit();
  }
}
