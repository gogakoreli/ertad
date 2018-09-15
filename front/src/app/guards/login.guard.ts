import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    const can = !!this.user.me;
    if (!can) {
      this.router.navigateByUrl('/');
    }
    return can;
  }
}
