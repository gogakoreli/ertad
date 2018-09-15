import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/api/types';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss'],
})
export class InviteFriendsComponent implements OnInit {
  form: FormGroup;
  friends: User[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: UserService,
  ) {}

  ngOnInit() {
    const friendsObject = this.friends.reduce((prev, curr) => {
      prev[curr.name] = false;
      return prev;
    }, {});

    this.form = new FormGroup({
      roomName: new FormControl('viyot_ertad'),
      friends: this.fb.group(friendsObject),
    });

    this.refresh();
  }

  async refresh() {
    const friends = await this.api.listUsers().toPromise();
    this.friends = friends.filter(x => x.id !== this.user.me.id);
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
    this.router.navigateByUrl('/');
  }
}
