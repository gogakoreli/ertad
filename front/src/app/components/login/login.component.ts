import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

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
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: 'ertad_vart_mtavaria',
    });
  }

  async save() {
    const username = this.form.value.username;
    const res = await this.api
      .addAction({
        type: 'CreateUser',
        user: {
          id: username,
          name: username,
        },
      })
      .toPromise();
    const users = await this.api.listUsers().toPromise();
    console.log(res, users);
    this.router.navigateByUrl('/dashboard');
  }
}
