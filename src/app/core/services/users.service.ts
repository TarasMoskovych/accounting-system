import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from 'src/app/core/core.module';
import { User } from 'src/app/shared';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: CoreModule
})
export class UsersService extends BaseHttpService {
  private usersUrl = 'users';
  private emailsUrl = 'emails';

  getUserByCredentials(email: string, password: string): Observable<User> {
    const url = `${this.usersUrl}/?email=${email}&password=${password}`;
    return this.get(null, { url }).pipe(map((user: User[]) => user[0]) || null);
  }

  checkEmail(email: string): Observable<User> {
    const url = `${this.emailsUrl}/?email=${email}`;
    return this.get(null, { url }).pipe(map((user: User[]) => user[0]) || null);
  }

  createUser(user: User): Observable<User> {
    return this.post(null, user, { url: this.usersUrl });
  }

  createEmail(data: any): Observable<string> {
    return this.post(null, data, { url: this.emailsUrl });
  }
}
