import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BillService, RecordsService, ActionsService, AuthService } from 'src/app/core/services';
import { User, Bill, Category, Action } from 'src/app/shared';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {
  private user: User;
  private destroy$ = new Subject<boolean>();
  private actions: Array<Action> = [];

  isLoaded = false;
  bill: Bill;
  categories: Array<Category> = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private actionServide: ActionsService,
    private billService: BillService,
    private recordsService: RecordsService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserFromSession();
    this.getData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getData(): void {
    combineLatest(
      this.billService.getBillById(this.user.id),
      this.recordsService.getCategories(),
      this.actionServide.getActions()
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: [Bill, Array<Category>, Array<Action>]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.actions = data[2];
      this.isLoaded = true;
      this.cdr.detectChanges();
    });
  }

  getCategoryCost(category: Category): number {
    const actions = this.actions.filter((action: Action) => {
      return action.category === category.id && action.type === 'outcome';
    });

    return actions.reduce((acc: number, action: Action) => acc + action.amount, 0);
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryPriority(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / +category.limit;
    return percent > 100 ? 100 : percent;
  }
}
