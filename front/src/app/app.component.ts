import { Component } from '@angular/core';
import { RealtimeService } from './api/realtime.service';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private user: UserService,
    private realtime: RealtimeService,
    private notification: NotificationService,
  ) {}

  logout() {
    this.user.logout();
  }
}
