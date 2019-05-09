import { Component, Input, OnInit } from '@angular/core';

import { Action, Category } from 'src/app/shared';

@Component({
  selector: 'app-history-actions',
  templateUrl: './history-actions.component.html',
  styleUrls: ['./history-actions.component.scss']
})
export class HistoryActionsComponent implements OnInit {
  @Input() actions: Array<Action> = [];
  @Input() categories: Array<Category> = [];

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
      action.categoryName = this.categories.find((category: Category) => category.id === action.id).name;
    });
  }

  onDropdownItemClick(field: string) {
    this.searchPlaceholder = this.searchMap[field];
    this.searchField = field;
  }
}
