import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService, BillService } from 'src/app/core/services';
import { User, Bill } from 'src/app/shared';
import { Subscription, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {
  user: User;
  currency: any;
  bill: Bill;
  isLoaded = false;

  private sub$: Subscription;
  private sub2$: Subscription;

  constructor(
    private authService: AuthService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserFromSession();

    this.sub$ = combineLatest(
      this.billService.getBillById(this.user.id),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2$ = this.billService.getCurrency().subscribe((currency) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub$) { this.sub$.unsubscribe(); }
    if (this.sub2$) { this.sub2$.unsubscribe(); }
  }
}
