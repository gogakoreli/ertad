import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/api/types';

const CURRENT_USER_KEY = 'CURRENT_USER_KEY';

@Injectable()
export class UserService {
  private _me: User;
  get me(): User {
    return this._me;
  }
  set me(value: User) {
    this._me = value;
  }

  constructor(private router: Router) {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    if (user) {
      this.me = user;
    }
  }

  logout() {
    this.me = null;
    localStorage.removeItem(CURRENT_USER_KEY);
    this.router.navigateByUrl('/');
  }

  setCurrentUser(user: User) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    this.me = user;
  }
}
