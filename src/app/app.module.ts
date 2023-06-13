import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyConverterComponent } from './app.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { CurrencyRatesComponent } from './currency-rates/currency-rates.component';

@NgModule({
  declarations: [
    CurrencyConverterComponent,
    CurrencyInputComponent,
    CurrencyRatesComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [CurrencyConverterComponent],
})
export class AppModule {}
