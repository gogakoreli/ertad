import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  roomId: string;
  host: User;

  room: Room;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private user: UserService,
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.params.roomId;
    this.room = await this.api.getRoomById(this.roomId).toPromise();
    this.host = this.room.host;
  }

  async yes() {
    await this.api
      .addAction({
        type: 'AcceptInvite',
        guest: {
          id: this.user.me.id,
          name: this.user.me.name,
        },
        roomId: this.roomId,
      })
      .toPromise();
    this.router.navigateByUrl(`room/${this.room.id}`);
  }

  async no() {
    await this.api
      .addAction({
        type: 'RejectInvite',
        guest: {
          id: this.user.me.id,
          name: this.user.me.name,
        },
        roomId: this.roomId,
      })
      .toPromise();
    this.router.navigateByUrl('/dashboard');
  }
}
