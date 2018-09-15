import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, User } from 'src/app/api/types';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomId: string;
  room: any;
  form: FormGroup;
  members: User[] = [
    {
      name: 'Goga',
      id: 'Goga',
    },
    {
      name: 'Sandro',
      id: 'Sandro',
    },
    {
      name: 'Giorgi',
      id: 'Giorgi',
    },
  ];

  transactions: any[] = [
    {
      user: {
        username: 'Goga',
      },
      amount: 25.5,
    },
    {
      user: {
        username: 'Sandro',
      },
      amount: 37.5,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.params.roomId;

    this.room = {
      id: this.roomId,
      name: this.roomId,
    };

    this.form = this.fb.group({});
  }

  addTransaction() {
    this.router.navigateByUrl(`transaction-create/${this.roomId}`);
  }
}
