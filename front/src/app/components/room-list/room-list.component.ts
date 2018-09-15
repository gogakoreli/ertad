import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Room, User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { RealtimeService } from '../../api/realtime.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms: RoomWithStatus[] = [];

  unsubscribe$ = new Subject<any>();

  constructor(
    private router: Router,
    private api: ApiService,
    private user: UserService,
    private realtime: RealtimeService,
  ) {}

  ngOnInit() {
    this.loadItems();
    this.realtime.action$
      .pipe(
        filter(x => x.type === 'CreateRoom' || x.type === 'CloseRoom'),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(rooms => {
        this.loadItems();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async loadItems() {
    const rooms = await this.api.listRooms().toPromise();

    this.setupRooms(rooms);
  }

  setupRooms(rooms: Room[]) {
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
