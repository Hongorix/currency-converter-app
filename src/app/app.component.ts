import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyService } from './currency-service/currency-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private currencyService: CurrencyService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      input1: [{ amount: 0, currency: 'USD' }],
      input2: [{ amount: 0, currency: 'UAH' }]
    });

    this.formGroup.valueChanges.subscribe((value) => {
      const input1 = value.input1;
      const input2 = value.input2;

      const haveCurrency = input1.currency;
      const wantCurrency = input2.currency;
      const amount = input1.amount;

      this.currencyService.convertCurrency(haveCurrency, wantCurrency, amount).subscribe({
        next: (newAmount) => {
          this.formGroup.patchValue(
            {
              input2: { amount: newAmount, currency: input2.currency }
            },
            { emitEvent: false }
          );
        },
        error: (error) => {
          console.log('Произошла ошибка при получении курса валют:', error);
        }
      });
    });
  }
}
