import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room, User } from 'src/app/api/api-model';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  host: User = {
    username: 'Sdolidze',
  };

  room: Room = {
    id: 'Go Jomardoba',
    name: 'Go Jomardoba',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  yes() {
    this.router.navigateByUrl(`room/${this.room.id}`);
  }

  no() {
    this.router.navigateByUrl('/dashboard');
  }
}
