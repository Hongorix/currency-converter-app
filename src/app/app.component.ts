import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyService } from './currency-service/currency-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  formGroup!: FormGroup;
  lastUpdatedInput = 'input1';

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      input1: [{ amount: 0, currency: 'USD' }],
      input2: [{ amount: 0, currency: 'UAH' }],
    });

    this.formGroup
      .get('input1')!
      .valueChanges.subscribe(() => (this.lastUpdatedInput = 'input1'));
    this.formGroup
      .get('input2')!
      .valueChanges.subscribe(() => (this.lastUpdatedInput = 'input2'));

    this.formGroup.valueChanges.subscribe((value) => {
      const input1 = value.input1;
      const input2 = value.input2;

      if (this.lastUpdatedInput === 'input1') {
        this.currencyService
          .convertCurrency(input1.currency, input2.currency, input1.amount)
          .subscribe((newAmount) =>
            this.formGroup.patchValue(
              { input2: { amount: newAmount, currency: input2.currency } },
              { emitEvent: false }
            )
          );
      } else if (this.lastUpdatedInput === 'input2') {
        this.currencyService
          .convertCurrency(input2.currency, input1.currency, input2.amount)
          .subscribe((newAmount) =>
            this.formGroup.patchValue(
              { input1: { amount: newAmount, currency: input1.currency } },
              { emitEvent: false }
            )
          );
      }
    });
  }
}
