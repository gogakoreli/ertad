import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room } from './api-model';
import { ApiService } from './api.service';
import { Action } from './types';

@Injectable({
  providedIn: "root"
})
export class RealtimeService {
  action$: Observable<Action>;
  room$: Observable<Room>;

  constructor(private socket: Socket, private api: ApiService) {
    console.log(socket);
    socket.connect();

    const action = this.socket.fromEvent("actions") as any;
    this.action$ = action;

    this.action$.subscribe(x => {
      console.log("action", x);
    });

    this.forRoom(1).subscribe(x => {
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
