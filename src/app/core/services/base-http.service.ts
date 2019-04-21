import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CoreModule } from './../core.module';
import { api } from '../configs';

@Injectable({
  providedIn: CoreModule
})
export class BaseHttpService {
  constructor(
    @Inject(api) private baseUrl: string,
    private http: HttpClient
  ) { }

  protected get(url: string, extraOptions?: any): Observable<any> {
    const action = url || `${this.baseUrl}/${extraOptions.url}`;

    return this.http.get(action)
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  protected post(url: string = '', data: any = {}, extraOptions?: any): Observable<any> {
    const action = url || `${this.baseUrl}/${extraOptions.url}`;

    return this.http.post(action, data)
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  protected put(url: string = '', data: any = {}, extraOptions?: any): Observable<any> {
    const action = url || `${this.baseUrl}/${extraOptions.url}`;

    return this.http.put(action, data)
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  protected handleError(err: HttpErrorResponse) {
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
