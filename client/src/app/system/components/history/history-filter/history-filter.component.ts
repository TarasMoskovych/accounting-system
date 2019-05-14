import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Category, actionTypes, actionTimePeriods } from 'src/app/shared/models';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Input() categories: Category[] = [];
  @Output() filterApply = new EventEmitter();
  @Output() filterCancel = new EventEmitter<boolean>();

  timePeriods = actionTimePeriods;
  types = actionTypes;

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  onFilterApply(): void {
    this.filterApply.emit({
      categories: this.selectedCategories,
      period: this.selectedPeriod,
      types: this.selectedTypes,
    });
  }

  onFilterCancel(): void {
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.filterCancel.emit(true);
  }

  onTypeChange({ checked, value }): void {
    this.handleCheckboxes('selectedTypes', checked, value);
  }

  onCategoryChange({ checked, value }): void {
    this.handleCheckboxes('selectedCategories', checked, value);
  }

  private handleCheckboxes(field: string, checked: boolean, value: string): void {
    if (checked) {
      if (!this[field].includes(value)) {
        this[field].push(value);
      }
    } else {
      this[field] = this[field].filter(item => item !== value);
    }
  }
}
