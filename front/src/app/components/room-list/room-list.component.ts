import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room, User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms: RoomWithStatus[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private user: UserService,
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    const rooms = await this.api.listRooms().toPromise();

    const roomsWithStatus: RoomWithStatus[] = rooms.map(room => {
      return {
        ...room,
        isPending: this.isMember(room, this.user.me),

        isRejected: this.isRejected(room, this.user.me),
      };
    });

    this.rooms = roomsWithStatus.filter(x =>
      x.users.find(y => y.id === this.user.me.id),
    );
  }

  isMember(room: Room, user: User) {
    const invitation = room.invitations[user.id];
    return (
      room.users.find(x => x.id === user.id) &&
      invitation &&
      invitation === 'pending'
    );
  }

  isRejected(room: Room, user: User) {
    const invitation = room.invitations[user.id];
    return (
      room.users.find(x => x.id === user.id) &&
      invitation &&
      invitation === 'rejected'
    );
  }

  goToRoom(room: RoomWithStatus) {
    if (room.isPending) {
      this.router.navigateByUrl(`${room.id}/invitation`);
    } else {
      this.router.navigateByUrl(`room/${room.id}`);
    }
  }
}

export type RoomWithStatus = Room & { isPending: boolean; isRejected: boolean };
