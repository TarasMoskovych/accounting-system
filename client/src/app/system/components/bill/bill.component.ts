import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { AuthService, BillService } from 'src/app/core/services';
import { User, Bill, currencyClasses, currencies } from 'src/app/shared/models';

// const mockData$ = of(currencies);

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  private currency: {};
  private user: User;

  bill: Bill;
  currencies = {};
  isLoaded = false;

  constructor(
    private authService: AuthService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserFromSession();
    this.getCurrency();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onRefresh(): void {
    this.isLoaded = false;
    this.billService.getCurrency()
      .pipe(takeUntil(this.destroy$))
      .subscribe((currency) => {
        this.currency = currency;
        this.isLoaded = true;
      });

    // mockData$
    //   .pipe(delay(1000), takeUntil(this.destroy$))
    //   .subscribe((currency) => {
    //     this.currency = currency;
    //     this.currencies = this.populateCurrency(this.currency);
    //     this.isLoaded = true;
    // });
  }

  private getCurrency(): void {
    combineLatest(this.billService.getBillById(this.user.id),/* mockData$ */ this.billService.getCurrency())
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.currencies = this.populateCurrency(this.currency);
        this.isLoaded = true;
    });
  }

  private populateCurrency(currency: any): any {
    const currencies = {};
    const { rates } = currency;

    const populateCurrencySymbol = (field: string, prop: string) => {
      currencies[prop] = {
        [field]: currencyClasses[prop],
        val: this.calculateCurrency(rates[prop]),
        date: currency.date
      };
    };

    for (const prop in currencyClasses) {
      if (rates[prop]) {
        if (String(currencyClasses[prop])[0] === '&') {
          populateCurrencySymbol('text', prop);
        } else {
          populateCurrencySymbol('className', prop);
        }
      }
    }
    return currencies;
  }

  private calculateCurrency(rate: number): number {
    return this.bill.value * rate;
  }
}
