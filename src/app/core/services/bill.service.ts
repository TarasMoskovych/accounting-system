import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bill } from 'src/app/shared';
import { CoreModule } from './../core.module';
import { currencyApi } from '../configs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: CoreModule
})
export class BillService extends BaseHttpService {
  private billsUrl = 'bills';

  getBillById(id: number): Observable<any> {
    const url = `${this.billsUrl}/?id=${id}`;
    return this.get(null, { url }).pipe(map((bill: Array<Bill>) => bill[0]) || null);
  }

  getCurrency(): Observable<any> {
    return this.get(currencyApi);
  }
}
