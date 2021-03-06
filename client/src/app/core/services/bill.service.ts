import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bill } from 'src/app/shared';
import { CoreModule } from 'src/app/core/core.module';
import { currencyApi } from 'src/app/core/configs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: CoreModule
})
export class BillService extends BaseHttpService {
  private billsUrl = 'bills';

  getBillById(id: number): Observable<Bill> {
    const url = `${this.billsUrl}/?id=${id}`;
    return this.get(null, { url }).pipe(map((bill: Bill[]) => bill[0]) || null);
  }

  getCurrency(): Observable<any> {
    return this.get(currencyApi);
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.post(null, bill, { url: this.billsUrl });
  }

  updateBill(bill: Bill, id: number): Observable<Bill> {
    const url = `${this.billsUrl}/${id}`;
    return this.put(null, bill, { url });
  }
}
