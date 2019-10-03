import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Currency, MarketCap, MetaData, Quote } from './interface';

import { environment } from '../../app/environment';


@Injectable()
export class RatesProvider {

  list: { [id: string]: number; } = {};

  constructor(
    public http: HttpClient
  ) { }

  public onInit() {
    return;
    
    timer(0, environment.rates.interval)
      .pipe(switchMap(() => this.getPrices()))
      .subscribe(this.setData.bind(this));
    timer(0, environment.rates.interval)
      .pipe(switchMap(() => this.getCoinPrice()))
      .subscribe(r => {
        this.list[environment.coin] = r['Last'];
      });
  }

  private setData(r) {
    Object
      .keys(environment.rates.currencies)
      .forEach(currency => {
        const id = environment.rates.currencies[currency];
        this.list[currency] = r.data[id].quotes[environment.rates.defaultQuote].price;
      });
  }

  private getPrices() {
    return this.http
      .get(environment.rates.apiUrl);
  }

  private getCoinPrice() {
    return this.http
      .get(environment.rates.coinRateApi);
  }

}
