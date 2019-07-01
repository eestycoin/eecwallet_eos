import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { User, Order } from '../../models/models';
import { environment } from '../../app/environment';

enum TxType { 'Plain', 'Income', 'Exchange', 'Error' };


@Injectable()
export class FirebaseProvider {

  constructor(private db: AngularFirestore) { }

  async saveItem(tx: string, from: string, to: string, amount: number = 0, error = '') {
    const id = this.db.createId();
    const data = { type: TxType.Plain, tx, from, to, amount, error, date: Date.now() };
    try {
      await this.db.collection('items').doc(id).set(data);
      console.log("Document written with TX: ", data.tx);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
    return data;
  }

  async saveOrder(from: string, to: string, amount: number = 0, orderId: string, error = '') {
    const id = this.db.createId();
    const data = { type: TxType.Exchange, from, to, amount, orderId, error, date: Date.now() };
    try {
      await this.db.collection('items').doc(id).set(data);
      console.log("Item written: ", data);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
    return data;
  }

  async updateOrder(order) {
    try {
      await this.db.collection('items').doc(order.id).set(order);
      console.log("Item written: ", order);
    } catch (e) {
      console.log("Error updating document: ", e);
    }
    return order;
  }

  async saveUser(user: User) {
    try {
      await this.db.collection('merchants').doc(user.addr).set(user);
      console.log("DocumUserent written with id: ", user);
    } catch (e) {
      console.log("Error adding user: ", e);
    }
    return user;
  }

  getUser(user: User) {
    return this.db.collection('merchants').doc(user.addr).get();
  }

  getItems(account: string) {
    return this.db
      .collection('items')
      .valueChanges()
      .pipe(map(results => this.mapItems(results, account.toUpperCase())));
  }

  getMerchants() {
    return this.db
      .collection('merchants')
      .valueChanges()
      .pipe(map((results: User[]) => this.mapMerchants(results)));
  }

  getOrders() {
    return this.db
      .collection('oreders')
      .valueChanges()
      .pipe(map((results: Order[]) => this.mapOrders(results)));
  }

  private mapItems(items: any[], account: string) {
    return items
      .sort((x, y) => x.date < y.date ? -1 : 1)
      .reverse()
      .map(item => {
        item.from = (item.from || '').toUpperCase();
        item.to = (item.to || '').toUpperCase();
        item.income = item.to === account;
        item.type = (item.type === TxType.Exchange) 
          ? TxType.Exchange
          : (item.to === account)
            ? TxType.Income
            : TxType.Plain;
        if (item.error) item.type = TxType.Error;
        item.currency = (item.type === TxType.Exchange) 
          ? item.to.split('-')[0]
          : environment.coin;
        return item;
      })
      .filter(item => (item.from === account) || (item.to === account));
  }

  private mapMerchants(users: User[]) {
    return users
      .filter(users => users.merchant);
  }

  private mapOrders(orders: Order[]) {
    return orders;
  }

}
