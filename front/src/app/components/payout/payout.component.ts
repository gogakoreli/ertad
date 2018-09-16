import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import { RealtimeService } from '../../api/realtime.service';
import { Payout, Room } from '../../api/types';
import { UserService } from '../../services/user.service';
import { guid } from '../../utils/utils';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss'],
})
export class PayoutComponent implements OnInit {
  unsubscribe$ = new Subject<any>();
  roomId: string;
  room: Room;
  payouts: Payout[];

  outgoing: Payout[];
  incoming: Payout[];

  alreadyPaid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private user: UserService,
    private realtime: RealtimeService,
  ) {}

  async ngOnInit() {
    this.roomId = this.route.snapshot.params.roomId;

    this.loadItems();
    this.realtime.action$
      .pipe(
        filter(x => x.type === 'PayPayout'),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(x => {
        this.loadItems();
      });
  }

  async loadItems() {
    this.room = await this.api.getRoomById(this.roomId).toPromise();
    this.payouts = this.room.payouts;
    this.incoming = this.payouts.filter(x => x.to.id === this.user.me.id);
    this.outgoing = this.payouts.filter(x => x.from.id === this.user.me.id);

    if (this.outgoing && this.outgoing.length > 0) {
      const payout = this.outgoing[0];
      this.alreadyPaid = payout.status === 'paid';
    }

    if (this.incoming && this.incoming.length > 0) {
      let alreadyPaid = true;
      this.incoming.forEach(x => {
        alreadyPaid = alreadyPaid && x.status === 'paid';
      });
      this.alreadyPaid = alreadyPaid;
    }
  }

  totalAmount(payouts: Payout[], withoutPending = false) {
    return payouts
      .filter(x => !withoutPending || x.status === 'paid')
      .reduce((prev, curr) => prev + curr.amount, 0);
  }

  async pay() {
    if (this.outgoing && this.outgoing.length > 0) {
      const promises = [];
      this.outgoing.forEach(x => {
        promises.push(
          this.api
            .addAction({
              type: 'PayPayout',
              payoutId: x.id,
              roomId: this.roomId,
              user: this.user.me,
            })
            .toPromise(),
        );
      });
      await Promise.all(promises);
      this.router.navigateByUrl('/dashboard');
    }
  }
}
