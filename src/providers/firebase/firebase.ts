import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { User, Tx } from '../../models/models';


@Injectable()
export class FirebaseProvider {

  constructor(private db: AngularFirestore) { }

  async saveItem(tx: string, from: string, to: string, amount: number = 0, error = '') {
    const id = this.db.createId();
    const data = { tx, from, to, amount, error, date: Date.now() };
    try {
      await this.db.collection('items').doc(id).set(data);
      console.log("Document written with TX: ", data.tx);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
    return data;
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
      .pipe(map(results => this.mapItems(results, account)));
  }

  getMerchants() {
    return this.db
      .collection('merchants')
      .valueChanges()
      .pipe(map((results: User[]) => this.mapMerchants(results)));
  }

  private mapItems(items: any[], account: string) {
    return items
      .sort((x, y) => x.date < y.date ? -1 : 1)
      .reverse()
      .map(item => {
        item.from = (item.from || '');
        item.to = (item.to || '');
        item.income = item.to === account;
        return item;
      })
      .filter(item => (item.from === account) || (item.to === account));
  }

  private mapMerchants(users: User[]) {
    return users
      .filter(users => users.merchant);
  }

}
