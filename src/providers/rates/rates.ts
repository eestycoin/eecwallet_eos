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
    timer(0, environment.rates.interval)
      .pipe(switchMap(() => this.getPrices()))
      .subscribe(this.setData.bind(this));
  }

  private setData(r) {
    Object
      .keys(environment.rates.currencies)
      .forEach(currency => {
        const id = environment.rates.currencies[currency];
        this.list[currency] = r.data[id].quotes[environment.rates.defaultQuote].price;
      });
      console.log(this.list);
  }

  private getPrices() {
    return this.http
      .get(environment.rates.apiUrl);
  }

}
