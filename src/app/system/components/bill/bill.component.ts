import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AuthService, BillService } from 'src/app/core/services';
import { User, Bill } from 'src/app/shared';

const mockData = {
  rates: {
    CAD: 1.504864,
    EUR: 1,
    PLN: 4.283689,
    RUB: 71.776051,
    UAH: 30.242455,
    USD: 1.125258
  },
  date: '2019-04-22'
};

const mockData$ = of(mockData);

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {
  private sub$: Subscription;
  private sub2$: Subscription;

  user: User;
  bill: Bill;
  currency: any;
  isLoaded = false;

  constructor(
    private authService: AuthService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserFromSession();

    this.sub$ = combineLatest(
      this.billService.getBillById(this.user.id),
      mockData$
      // this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    // this.sub2$ = this.billService.getCurrency().subscribe((currency) => {
    //   this.currency = currency;
    //   this.isLoaded = true;
    // });


    this.sub2$ = mockData$.pipe(delay(1000)).subscribe((currency) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub$) { this.sub$.unsubscribe(); }
    if (this.sub2$) { this.sub2$.unsubscribe(); }
  }
}
