import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Input() categories: Category[] = [];
  @Output() filterApply = new EventEmitter();
  @Output() filterCancel = new EventEmitter<boolean>();

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {
      type: 'd',
      label: 'Day'
    },
    {
      type: 'w',
      label: 'Week'
    },
    {
      type: 'M',
      label: 'Month'
    }
  ];

  types = [
    {
      type: 'income',
      label: 'Income'
    },
    {
      type: 'outcome',
      label: 'Outcome'
    }
  ];

  onFilterApply() {
    this.filterApply.emit({
      categories: this.selectedCategories,
      period: this.selectedPeriod,
      types: this.selectedTypes,
    });
  }

  onFilterCancel() {
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.filterCancel.emit(true);
  }

  onTypeChange({ checked, value }) {
    this.handleCheckboxes('selectedTypes', checked, value);
  }

  onCategoryChange({ checked, value }) {
    this.handleCheckboxes('selectedCategories', checked, value);
  }

  private handleCheckboxes(field: string, checked: boolean, value: string) {
    if (checked) {
      if (!this[field].includes(value)) {
        this[field].push(value);
      }
    } else {
      this[field] = this[field].filter(item => item !== value);
    }
  }
}
