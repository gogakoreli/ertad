import { Injectable } from '@angular/core';
import { User } from 'src/app/api/types';

@Injectable()
export class UserService {
  private _me: User;
  get me(): User {
    return this._me;
  }
  set me(value: User) {
    this._me = value;
  }

  setCurrentUser(user: User) {
    this.me = user;
  }
}
