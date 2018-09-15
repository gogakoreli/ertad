import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { RealtimeService } from '../../api/realtime.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss'],
})
export class InviteFriendsComponent implements OnInit {
  form: FormGroup;
  friends: User[] = [];

  unsubscribe$ = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: UserService,
    private realtime: RealtimeService,
  ) {}

  async ngOnInit() {
    this.initializeForm([]);
    await this.loadItems();

    this.realtime.users$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(friends => {
        this.setupFriends(friends);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async loadItems() {
    let friends = await this.api.listUsers().toPromise();
    this.setupFriends(friends);
  }

  setupFriends(friends: User[]) {
    friends = friends.filter(x => x.id !== this.user.me.id);
    this.initializeForm(friends);
    this.friends = friends;
  }

  initializeForm(friends: User[]) {
    const friendsObject = friends.reduce((prev, curr) => {
      prev[curr.id] = false;
      return prev;
    }, {});

    this.form = new FormGroup({
      roomName: new FormControl('viyot_ertad'),
      friends: this.fb.group(friendsObject),
    });
  }

  checkCheckbox(checkbox: MatCheckbox, friend: User) {
    checkbox.toggle();
    const checked = checkbox.checked;
    this.form.patchValue({
      friends: {
        [friend.name]: checked,
      },
    });
  }

  save() {
    // TODO : save friends list
    console.log(this.form.value);
    // this.api.
    this.router.navigateByUrl('/');
  }
}
