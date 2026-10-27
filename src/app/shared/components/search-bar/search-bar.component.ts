import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() searchBar = new EventEmitter<string>();

  searchControl = new FormControl('');

  onSearch(): void {
    this.searchBar.emit(this.searchControl.value?.trim() ?? '');
  }
}
