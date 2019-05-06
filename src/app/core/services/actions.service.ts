import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
