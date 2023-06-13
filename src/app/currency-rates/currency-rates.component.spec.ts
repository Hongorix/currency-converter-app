import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRatesComponent } from './currency-rates.component';

describe('CurrencyRatesComponent', () => {
  let component: CurrencyRatesComponent;
  let fixture: ComponentFixture<CurrencyRatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyRatesComponent]
    });
    fixture = TestBed.createComponent(CurrencyRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
