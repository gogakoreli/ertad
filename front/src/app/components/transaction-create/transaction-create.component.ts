import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss'],
})
export class TransactionCreateComponent implements OnInit {
  form: FormGroup;
  roomId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private user: UserService,
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.params.roomId;

    this.form = this.fb.group({
      amount: null,
    });
  }

  amountChanged(amount: number) {
    this.form.patchValue({
      amount,
    });
  }

  async save() {
    await this.api
      .addAction({
        type: 'AddReceipt',
        roomId: this.roomId,
        receipt: {
          user: this.user.me,
          amount: this.form.value.amount,
          imageUrl: '[fake]',
        },
      })
      .toPromise();

    this.router.navigateByUrl(`room/${this.roomId}`);
  }
}
