import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CurrencyConverterComponent } from './app.component';

@NgModule({
  declarations: [
    CurrencyConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [CurrencyConverterComponent]
})
export class AppModule { }
