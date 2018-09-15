import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { RealtimeService } from '../api/realtime.service';
import { isMember, isNotHost } from '../utils/utils';
import { UserService } from './user.service';

@Injectable()
export class NotificationService {
  constructor(
    public snackBar: MatSnackBar,
    private realtime: RealtimeService,
    private router: Router,
    private api: ApiService,
    private user: UserService,
  ) {
    this.initializeRealtimeNotifications();
  }

  initializeRealtimeNotifications() {
    this.realtime.action$
      .pipe(
        filter(x => x.type === 'CreateRoom'),
        switchMap(x =>
          this.api.getRoomById(x.type === 'CreateRoom' && x.roomId),
        ),
        filter(x => isMember(x, this.user.me) && isNotHost(x, this.user.me)),
      )
      .subscribe(room => {
        this.openSnackBar(
          `Room Invitation from ${room.host.name}`,
          'Show Me',
          () => {
            this.router.navigateByUrl(`${room.id}/invitation`);
          },
        );
      });
  }

  openSnackBar(message: string, action: string, delegate = () => {}) {
    const snackBar = this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    snackBar.afterDismissed().subscribe(x => {
      delegate();
    });
  }
}
