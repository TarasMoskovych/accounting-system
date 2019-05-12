import { Component, Input, OnInit } from '@angular/core';

import { Action, Category } from 'src/app/shared';

@Component({
  selector: 'app-history-actions',
  templateUrl: './history-actions.component.html',
  styleUrls: ['./history-actions.component.scss']
})
export class HistoryActionsComponent implements OnInit {
  @Input() actions: Action[] = [];
  @Input() categories: Category[] = [];

  readonly searchMap = {
    categoryName: 'Category',
    date: 'Date',
    amount: 'Price',
    type: 'Type'
  };

  searchValue = '';
  searchPlaceholder = 'Price';
  searchField = 'amount';

  ngOnInit() {
    this.actions.forEach((action: Action) => {
      const category = this.categories.find((item: Category) => item.id === action.id);

      if (category) { action.categoryName = category.name; }
    });
  }

  onDropdownItemClick(field: string): void {
    this.searchPlaceholder = this.searchMap[field];
    this.searchField = field;
  }
}
