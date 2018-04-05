import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  request<T>(url: string, options?: { method?: string, params?: any, body?: any, headers? }, fallbackResponse?: T): Observable<T> {

    url = '/api' + url;

    let method = 'GET', body, headers, params;
    if (options) {
      method = options.method || method;
      params = options.params;
      body = options.body;
      headers = options.headers;
      if (typeof body === 'object') {
        headers = {
          ...headers,
          'Content-Type': 'application/json'
        };
      }
    }

    return this.http.request<T>(method, url, {
      params,
      body,
      headers
    })
    .pipe(
      catchError(this.handleError<T>(fallbackResponse))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
