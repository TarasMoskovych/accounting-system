import { Component, OnInit, Input } from '@angular/core';

import { Bill } from 'src/app/shared';

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

  constructor() { }
  ngOnInit() {
    const { rates } = this.currency;

    this.usd = rates.USD * this.bill.value;
    this.uah = +rates.UAH * this.bill.value;
  }
}
