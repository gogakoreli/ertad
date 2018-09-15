import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RealtimeService } from '../api/realtime.service';

@Injectable()
export class NotificationService {
  constructor(
    public snackBar: MatSnackBar,
    private realtime: RealtimeService,
    private router: Router,
  ) {
    this.initializeRealtimeNotifications();
  }

  initializeRealtimeNotifications() {
    // this.openSnackBar('goga', 'Show Me', () => {
    //   this.router.navigateByUrl('/dashboard');
    // });
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
