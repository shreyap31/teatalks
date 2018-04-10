import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) { }

  login(userId: string, password: string): Observable<User> {
    return this.apiService.request<User>('/teaTalks/login', {
      method: 'POST',
      body: {
        userId,
        password
      }
    });
  }

  signup(user: User): Observable<any> {
    return this.apiService.request('/teaTalks/signup', {
      method: 'POST',
      body: user
    });
  }

  logout(): Observable<any> {
    return this.apiService.request('/teaTalks/logout', {
      method: 'POST'
    });
  }
}
