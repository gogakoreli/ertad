import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/api/types';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss'],
})
export class InviteFriendsComponent implements OnInit {
  form: FormGroup;
  friends: User[] = [
    {
      name: 'dybala',
      id: 'dybala',
    },
    {
      name: 'dele',
      id: 'dele',
    },
    {
      name: 'griezman',
      id: 'griezman',
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const friendsObject = this.friends.reduce((prev, curr) => {
      prev[curr.name] = false;
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
    this.router.navigateByUrl('/');
  }
}
