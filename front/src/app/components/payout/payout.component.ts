import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { RealtimeService } from '../../api/realtime.service';
import { Room } from '../../api/types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
})
export class PayoutComponent implements OnInit {
  unsubscribe$ = new Subject<any>();
  roomId: string;
  room: Room;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private user: UserService,
    private realtime: RealtimeService,
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.params.roomId;

    this.room = await this.api.getRoomById(this.roomId).toPromise();
  }

  pay() {
    this.router.navigateByUrl('/dashboard');
  }
}
