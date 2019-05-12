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

  getActionsByUserId(id: number): Observable<Action[]> {
    const url = `${this.actionsUrl}/?userId=${id}`;
    return this.get(null, { url });
  }

  getActionById(id: string): Observable<Action> {
    const url = `${this.actionsUrl}/?id=${id}`;
    return this.get(null, { url }).pipe(map((action: Action[]) => action[0]) || null);
  }
}
