import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../app/environment';

export enum OrderStatus { AwaitingDeposit, AwaitingDepositConfirmations, AwaitingTrade, Completed };

export interface Order {
  status: OrderStatus;
  orderId: string;
  from: string;
  to: string;
  amount: number;
  error?: string;
  price?: number;
}

@Injectable()
export class ExchangeProvider {

  orders: Order[] = [];
  watchOrdersInterval = 3000;

  constructor(public http: HttpClient) {
    this.restoreOrders();
    this.watchOrders();
  }

  getCoinPrice() {
    return this.http
      .get(environment.rates.coinRateApi)
      .toPromise();
  }

  getPrice(CurrencyIn = 'ETH', CurrencyOut = 'EEC', Amount = 0.1) {
    const data = { CurrencyIn, Amount, CurrencyOut };
    return this.http
      .post(environment.exchange.apiUrl + '/price', data)
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

  saveOrder(order: Order): void {
    this.updateOrders([order]);
  }

  // PRIVATE

  private watchOrders(): void {
    setInterval(() => {
      this.orders.forEach((order: Order) => {
        console.log(order);
        if (order.status !== OrderStatus.Completed)
          this.getOrder(order.orderId)
            .then(r => {
              console.log(123, r)
            })
            .catch(console.log);
      });
    }, this.watchOrdersInterval);
  }

  private restoreOrders(): void {
    const orders = localStorage.getItem('orders');
    if (orders)
      this.orders = JSON.parse(orders);
  }

  private updateOrders(orders: Order[]): void {
    orders.forEach((order: Order) => {
      let existingOrder = this.orders.find(v => v.orderId === order.orderId);
      if (existingOrder)
        existingOrder = order;
      else
        this.orders.push(order);
    });
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
}
