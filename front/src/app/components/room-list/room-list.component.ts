import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Room, User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { RealtimeService } from '../../api/realtime.service';
import { UserService } from '../../services/user.service';
import { isPendingMember, isRejectedMember } from '../../utils/utils';

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
      .subscribe(x => {
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
        isPending: isPendingMember(room, this.user.me),

        isRejected: isRejectedMember(room, this.user.me),
      };
    });

    this.rooms = roomsWithStatus.filter(x =>
      x.users.find(y => y.id === this.user.me.id),
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
