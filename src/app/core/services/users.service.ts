import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User } from 'src/app/shared';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: CoreModule
})
export class UsersService extends BaseHttpService {
  private usersUrl = 'users';

  getUserByCredentials(email: string, password: string): Observable<any> {
    const url = `${this.usersUrl}/?email=${email}&password=${password}`;
    return this.get(null, { url }).pipe(map((user: Array<User>) => user[0]) || null);
  }

  checkEmail(email: string): Observable<any> {
    const url = `${this.usersUrl}/?email=${email}`;
    return this.get(null, { url }).pipe(map((user: Array<User>) => user[0]) || null);
  }

  createUser(user: User): Observable<User> {
    return this.post(null, user, { url: this.usersUrl });
  }
}
