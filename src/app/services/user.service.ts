import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) { }

  login(userId = 'Default'): Observable<User> {
    return this.apiService.request<User>(`/teaTalks/login`);
  }

  signup(userId = 'Default'): Observable<User> {
    return this.apiService.request<User>(`/teaTalks/signup`);

}
}
