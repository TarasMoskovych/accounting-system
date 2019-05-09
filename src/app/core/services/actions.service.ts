import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { Action } from 'src/app/shared/models';

import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: CoreModule
})
export class ActionsService extends BaseHttpService {
  private actionsUrl = 'events';

  createAction(action: Action): Observable<Action> {
    return this.post(null, action, { url: this.actionsUrl });
  }

  getActions(): Observable<Array<Action>> {
    return this.get(null, { url: this.actionsUrl });
  }

  getActionById(id: string): Observable<Action> {
    const url = `${this.actionsUrl}/?id=${id}`;
    return this.get(null, { url }).pipe(map((action: Array<Action>) => action[0]) || null);
  }
}
