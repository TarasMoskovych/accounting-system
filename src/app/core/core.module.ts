import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiProvider } from './configs';

@NgModule({
  providers: [ApiProvider, CurrencyPipe]
})
export class CoreModule { }
