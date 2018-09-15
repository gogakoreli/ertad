import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/api/api-model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [
    {
      name: 'Sandro',
    },
    {
      name: 'Gelda',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
