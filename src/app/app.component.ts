import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CurrencyConversionResponse {
  new_amount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  usdToUahRate = 0;
  eurToUahRate = 0;
  amount1 = 0;
  amount2 = 0;
  currency1 = 'USD';
  currency2 = 'UAH';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCurrencyRates();
  }

  convertCurrency(conversionType: number) {
    let haveCurrency, wantCurrency, amount;
    haveCurrency = (conversionType === 1) ? this.currency1 : this.currency2;
    wantCurrency = (conversionType === 1) ? this.currency2 : this.currency1;
    amount = (conversionType === 1) ? this.amount1 : this.amount2;

    const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${haveCurrency}&want=${wantCurrency}&amount=${amount}`;
    this.http.get<CurrencyConversionResponse>(url)
      .subscribe({
        next: response => {
          this.amount1 = (conversionType === 1) ? this.amount1 : response.new_amount;
          this.amount2 = (conversionType === 1) ? response.new_amount : this.amount2;
        },
        error: error => {
          console.log('Произошла ошибка при получении курса валют:', error);
        }
      });
  }

  getCurrencyRates() {
    const usdToUahUrl = 'https://api.api-ninjas.com/v1/convertcurrency?have=USD&want=UAH&amount=1';
    this.http.get<CurrencyConversionResponse>(usdToUahUrl)
      .subscribe({
        next: response => {
          this.usdToUahRate = response.new_amount;
        },
        error: error => {
          console.log('Произошла ошибка при получении курса USD к UAH:', error);
        }
      });

    const eurToUahUrl = 'https://api.api-ninjas.com/v1/convertcurrency?have=EUR&want=UAH&amount=1';
    this.http.get<CurrencyConversionResponse>(eurToUahUrl)
      .subscribe({
        next: response => {
          this.eurToUahRate = response.new_amount;
        },
        error: error => {
          console.log('Произошла ошибка при получении курса EUR к UAH:', error);
        }
      });
  }
}
