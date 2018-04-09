import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Tea } from '../models/tea';
import { User } from '../models/user';

@Injectable()
export class AppStateService {

  teaList: Tea[];

  constructor(
    private cookieService: CookieService
  ) { }

  get isLoggedIn(): boolean {
    return !!this.cookieService.get('TTK_USER');
  }

  get userId(): string {
    return this.cookieService.get('TTK_USER');
  }

}
