import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency-service/currency-service.component';

interface CurrencyConversionResponse {
  new_amount: number;
}

@Component({
  selector: 'app-currency-rates',
  templateUrl: './currency-rates.component.html',
})
export class CurrencyRatesComponent implements OnInit {
  usdToUahRate = 0;
  eurToUahRate = 0;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.getCurrencyRates();
  }

  getCurrencyRates() {
    this.currencyService.getCurrencyRates().subscribe({
      next: (rates) => {
        this.usdToUahRate = rates.USD;
        this.eurToUahRate = rates.EUR;
      },
      error: (error) => {
        console.log('Произошла ошибка при получении курсов валют:', error);
      },
    });
  }
}
