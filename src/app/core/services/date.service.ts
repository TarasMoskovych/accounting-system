import { Injectable } from '@angular/core';
import { interval, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class DateService {

  constructor() { }

  getDate$(ms = 1000) {
    return timer(0, ms).pipe(switchMap(() => of(this.getDate())));
  }

  private getDate() {
    return Date.now();
  }
}
