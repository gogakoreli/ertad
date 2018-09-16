import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Action, Room, User } from './types';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  action$: Observable<Action>;
  users$: Observable<User[]>;

  constructor(private socket: Socket, private api: ApiService) {
    socket.connect();

    const action = this.socket.fromEvent('actions') as any;
    this.action$ = action;

    const users = this.socket.fromEvent('users') as any;
    this.users$ = users;
  }
}
