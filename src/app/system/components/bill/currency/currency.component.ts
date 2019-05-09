import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Bill } from 'src/app/shared/models';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyComponent {
  @Input() currencies: any;
  @Input() bill: Bill;
}
