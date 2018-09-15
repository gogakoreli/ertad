import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Action } from './types';

@Injectable({
  providedIn: "root"
})
export class RealtimeService {
  action$: Observable<Action>;

  constructor(socket: Socket) {
    console.log(socket);
    socket.connect();

    this.action$ = socket.fromEvent("action") as any;

    this.action$.subscribe(x => {
      console.log(x);
    });
  }
}
