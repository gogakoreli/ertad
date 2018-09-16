import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { Room, User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { RealtimeService } from '../../api/realtime.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
  roomId: string;
  room: Room;
  form: FormGroup;
  totalAmount = totalAmount;

  unsubscribe$ = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private realtime: RealtimeService,
    private api: ApiService,
    public user: UserService,
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.params.roomId;

    this.form = this.fb.group({});

    this.room = await this.api.getRoomById(this.roomId).toPromise();

    if (this.room.status === 'closed') {
      this.router.navigateByUrl(`${this.roomId}/payout`);
    }

    this.realtime.action$
      .pipe(
        takeUntil(this.unsubscribe$),
        flatMap(_ => this.api.getRoomById(this.roomId)),
      )
      .subscribe(room => {
        this.room = room;
      });
  }

  addTransaction() {
    this.router.navigateByUrl(`transaction-create/${this.roomId}`);
  }

  async closeRoom() {
    await this.api
      .addAction({
        type: 'CloseRoom',
        roomId: this.roomId,
      })
      .toPromise();

    this.router.navigateByUrl(`${this.roomId}/payout`);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

function totalAmount(room: Room) {
  return Object.values(room.balances).reduce((a, b) => a + b, 0);
}
