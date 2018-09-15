import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: UserService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: 'ertad_vart_mtavaria',
    });
    if (this.user.me) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  async save() {
    const username = this.form.value.username;
    const user = {
      id: username,
      name: username,
    };
    const res: any = await this.api
      .addAction({
        type: 'CreateUser',
        user,
      })
      .toPromise();
    const users = await this.api.listUsers().toPromise();
    if (res && res.message === 'OK') {
      this.user.setCurrentUser(user);
    }
    this.router.navigateByUrl('/dashboard');
  }
}
