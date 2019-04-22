import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Bill } from './../../../../shared/models';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyComponent implements OnInit {
  @Input() currencies: any;
  @Input() bill: Bill;

  constructor() { }

  ngOnInit() {
  }
}
