import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { Category, Action, User, Bill, Message } from 'src/app/shared/models';
import { RecordsService, ActionsService, BillService, AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {
  private bill: Bill;
  private user: User;
  private channel = new Subject();
  private destroy$ = new Subject<boolean>();

  categories: Category[];
  channel$ = this.channel.asObservable();
  isLoaded = false;
  message: Message;

  constructor(
    private actionsService: ActionsService,
    private authService: AuthService,
    private billService: BillService,
    private currencyPipe: CurrencyPipe,
    private recordsService: RecordsService
  ) { }

  ngOnInit() {
    this.message = new Message('', '');

    this.user = this.authService.getUserFromSession();
    this.getBillById();
    this.getCategories();
  }

  ngOnDestroy() {
    this.channel.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onAddCategory(category: Category): void {
    this.recordsService.createCategory({ ...category, userId: this.user.id })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Category) => {
        this.categories = [...this.categories, data];
        this.channel.next('created');
      });
  }

  onEditCategory(category: Category): void {
    this.recordsService.updateCategory({ ...category, userId: this.user.id })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Category) => {
        const tmp = this.categories.filter((item: Category) => item.id !== data.id);
        this.categories = [...tmp, category];
        this.channel.next('edited');
      });
  }

  onRemoveCategory(category: Category): void {
    this.recordsService.removeCategory(category.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const tmp = this.categories.filter((item: Category) => item.id !== category.id);
        this.categories = [...tmp];
      });
  }

  onAddAction(action: Action) {
    const bill = this.bill.value;
    const amount = action.amount;
    let result = 0;

    if (action.type === 'outcome') {
      if (amount > bill) {
        return this.message = new Message(
          'danger',
          `You don't have enough money! You need ${this.currencyPipe.transform(amount - bill, this.bill.currency)}`
        );
      } else {
        result = bill - amount;
      }
    } else {
      result = bill + amount;
    }

    this.updateBill(new Bill(result, this.bill.currency), action);
  }

  onHideAlert(): void {
    this.message.text = '';
  }

  private getCategories(): void {
    this.recordsService.getCategoriesByUserId(this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  private getBillById(): void {
    this.billService.getBillById(this.user.id).pipe(takeUntil(this.destroy$))
      .subscribe((data: Bill) => {
        this.bill = data;
      });
  }

  private updateBill(bill: Bill, action: Action): void {
    this.billService.updateBill(bill, this.user.id)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.actionsService.createAction({ ...action, userId: this.user.id }))
      )
      .subscribe(() => {
        this.bill.value = bill.value;
        this.message = new Message(
          'success',
          `Action was added! Your bill is ${this.currencyPipe.transform(bill.value, this.bill.currency)}`
        );
      });
  }
}
