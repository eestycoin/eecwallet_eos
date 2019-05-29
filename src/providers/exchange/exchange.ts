import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../app/environment';


@Injectable()
export class ExchangeProvider {

  constructor(
    public http: HttpClient
  ) { }

  getCoinPrice() {
    return this.http
      .get(environment.rates.coinRateApi)
      .toPromise();
  }

  getPrice(CurrencyIn = 'ETH', CurrencyOut = 'EEC', Amount = 0.1) {
    const data = { CurrencyIn, Amount, CurrencyOut };
    return this.http
      .post(environment.exchange.apiUrl + 'price', data)
      .toPromise();
  }

  putOrder(CurrencyIn: string, CurrencyOut: string, Amount: number, DestinationAddress: string, ReturnAddress?: string) {
    const data = { CurrencyIn, CurrencyOut, Amount, DestinationAddress, ReturnAddress: ReturnAddress || DestinationAddress };
    return this.http
      .post(environment.exchange.apiUrl + '/order', data)
      .toPromise();
  }

  getOrder(id: string) {
    return this.http
      .get(environment.exchange.apiUrl + '/order/' + id)
      .toPromise();
  }

}
