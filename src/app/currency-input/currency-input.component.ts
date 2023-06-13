import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true
    }
  ]
})
export class CurrencyInputComponent implements ControlValueAccessor {
  value = 0;
  currency = 'USD';

  onChange: (value: { amount: number; currency: string }) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: { amount: number; currency: string }): void {
    if (value) {
      this.value = value.amount;
      this.currency = value.currency;
    }
  }

  registerOnChange(fn: (value: { amount: number; currency: string }) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.onChange({ amount: this.value, currency: this.currency });
    this.onTouched();
  }

  onCurrencyChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.currency = target.value;
    this.onChange({ amount: this.value, currency: this.currency });
    this.onTouched();
  }
}
