import { Component, OnInit, Input } from '@angular/core';

import { Bill, currencyClasses } from 'src/app/shared';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;

  usd: number;
  uah: number;
  currencies = {};

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;

    for (let prop in currencyClasses) {
      this.currencies[prop] = {
        className: currencyClasses[prop],
        value: this.calculateCurrency(rates[prop])
      };
    }

    this.usd = rates.USD * this.bill.value;
    this.uah = rates.UAH * this.bill.value;
  }

  private calculateCurrency(rate: number) {
    return this.bill.value * rate;
  }
}
