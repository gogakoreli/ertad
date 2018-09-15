import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  save() {
    // TODO : save transaction
    console.log(this.form.value);
    this.router.navigateByUrl(`room/${this.roomId}`);
  }
}
