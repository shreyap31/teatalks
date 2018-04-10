import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppStateService } from './services/app.state.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private appStateService: AppStateService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.appStateService.isLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
