import { Component, Input, OnInit } from '@angular/core';

import { Action, Category, searchMap } from 'src/app/shared/models';

@Component({
  selector: 'app-history-actions',
  templateUrl: './history-actions.component.html',
  styleUrls: ['./history-actions.component.scss']
})
export class HistoryActionsComponent implements OnInit {
  @Input() actions: Action[] = [];
  @Input() categories: Category[] = [];

  readonly searchMap = searchMap;
  searchValue = '';
  searchPlaceholder = 'Price';
  searchField = 'amount';

  ngOnInit() {
    this.actions.forEach((action: Action) => {
      const category = this.categories.find((item: Category) => item.id === action.category);

      if (category) { action.categoryName = category.name; }
    });
  }

  onDropdownItemClick(field: string): void {
    this.searchPlaceholder = this.searchMap[field];
    this.searchField = field;
  }
}
