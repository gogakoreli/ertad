import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Room } from './api-model';
import { ApiService } from './api.service';
import { Action, User } from './types';

@Injectable({
  providedIn: "root"
})
export class RealtimeService {
  action$: Observable<Action>;
  room$: Observable<Room>;
  users$: Observable<User>;

  constructor(private socket: Socket, private api: ApiService) {
    console.log(socket);
    socket.connect();

    const action = this.socket.fromEvent("actions") as any;
    this.action$ = action;

    const users = this.socket.fromEvent("users") as any;
    this.users$ = users;

    this.action$.subscribe(x => {
      console.log("action", x);
    });

    this.users$.subscribe(xs => {
      console.log("users", xs);
    });

    this.forRoom("1").subscribe(x => {
      console.log("rooms/1", x);
    });

    this.api.listUsers().subscribe(x => {
      console.log("users", x);
    });
  }

  forRoom(roomId: string) {
    const x = this.socket.fromEvent("rooms/" + roomId) as any;
    return x as Observable<Room>;
  }
}
