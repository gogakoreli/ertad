import { Component } from '@angular/core';
import { RealtimeService } from './api/realtime.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private user: UserService, private realtime: RealtimeService) {}

  logout() {
    this.user.logout();
  }
}
