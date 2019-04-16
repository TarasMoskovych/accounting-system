import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User } from 'src/app/shared';
import { api } from '../configs';

@Injectable({
  providedIn: CoreModule
})
export class UsersService {
  private usersUrl = `${this.url}/users`;

  constructor(
    @Inject(api) private url: string,
    private http: HttpClient
    ) { }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<Array<User>>(`${this.usersUrl}?email=${email}`)
      .pipe(
        map((users: User[]) => users.length ? users[0] : of(null)),
        catchError(this.handleError)
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
