import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { RecordsService, ActionsService } from 'src/app/core/services';
import { Category, Action } from 'src/app/shared';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  isLoaded = false;
  actions: Array<Action> = [];
  filteredActions: Action[] = [];
  categories: Array<Category> = [];

  chartData = [];
  isFilterVisible = false;

  constructor(
    private actionsService: ActionsService,
    private recordsService: RecordsService
  ) { }

  ngOnInit() {
    this.getCategoryAndActions();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onOpenFilter() {
    this.toggleFilter(true);
  }

  onFilterApply(data) {
    const start = moment().startOf(data.period).startOf('d');
    const end = moment().endOf(data.period).endOf('d');

    this.toggleFilter(false);
    this.setActions();

    this.filteredActions = this.filteredActions
      .filter((action: Action) => {
        return data.types.includes(action.type) && data.categories.includes(action.category.toString());
      })
      .filter((action: Action) => {
        const date = moment(action.date, 'DD.MM.YYYY HH:mm:ss');
        return date.isBetween(start, end);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilter(false);
    this.setActions();
    this.calculateChartData();
  }

  private toggleFilter(visibility: boolean) {
    this.isFilterVisible = visibility;
  }

  private getCategoryAndActions(): void {
    combineLatest(
      this.actionsService.getActions(),
      this.recordsService.getCategories()
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: [Array<Action>, Array<Category>]) => {
        this.actions = data[0];
        this.categories = data[1];
        this.isLoaded = true;
        this.setActions();
        this.calculateChartData();
      });
  }

  private calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((category: Category) => {
      const categoryActions = this.filteredActions.filter((action: Action) => action.category === category.id && action.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryActions.reduce((acc: number, item: Action) => acc + item.amount, 0)
      });
    });
  }

  private setActions() {
    this.filteredActions = [...this.actions];
  }
}
