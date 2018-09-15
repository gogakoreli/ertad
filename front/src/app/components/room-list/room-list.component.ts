import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/api/types';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [
    {
      id: 'Sandros Birthday Party',
      name: 'Sandros Birthday Party',
    },
    {
      id: 'Go Jomardoba',
      name: 'Go Jomardoba',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToRoom(room: Room) {
    this.router.navigateByUrl(`room/${room.id}`);
  }
}
