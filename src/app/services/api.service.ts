import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
    });
  }
}
