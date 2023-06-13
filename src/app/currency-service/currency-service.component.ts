import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface CurrencyConversionResponse {
  new_amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<{ USD: number; EUR: number }> {
    const url = 'https://api.api-ninjas.com/v1/convertcurrency';
    const currencies = ['USD', 'EUR'];
    const rates: { [key: string]: number } = {};

    const requests = currencies.map((currency) =>
      this.http.get<CurrencyConversionResponse>(`${url}?have=${currency}&want=UAH&amount=1`).pipe(
        map((response) => {
          if (response) {
            return response;
          } else {
            throw new Error(`Response is undefined for ${currency}`);
          }
        })
      )
    );

    return forkJoin(requests).pipe(
      map((responses) => {
        responses.forEach((response, index) => {
          rates[currencies[index]] = response.new_amount;
        });

        return { USD: rates['USD'] || 0, EUR: rates['EUR'] || 0 };
      })
    );
  }

  convertCurrency(haveCurrency: string, wantCurrency: string, amount: number): Observable<number> {
    const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${haveCurrency}&want=${wantCurrency}&amount=${amount}`;
    return this.http.get<CurrencyConversionResponse>(url).pipe(map((response) => response.new_amount));
  }
}
