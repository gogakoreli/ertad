import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];

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
    this.rooms = rooms.filter(x => x.users.find(y => y.id === this.user.me.id));
  }

  goToRoom(room: Room) {
    this.router.navigateByUrl(`room/${room.id}`);
  }
}
