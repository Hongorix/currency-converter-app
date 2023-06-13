import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyServiceComponent } from './currency-service.component';

describe('CurrencyServiceComponent', () => {
  let component: CurrencyServiceComponent;
  let fixture: ComponentFixture<CurrencyServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyServiceComponent]
    });
    fixture = TestBed.createComponent(CurrencyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
