import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


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

  getItems(account: string) {
    return this.db
      .collection('items')
      .valueChanges()
      .pipe(map(results => this.mapItems(results, account.toUpperCase())));
  }

  private mapItems(items: any[], account: string) {
    return items
      .sort((x, y) => x.date < y.date ? -1 : 1)
      .reverse()
      .map(item => {
        item.from = (item.from || '').toUpperCase();
        item.to = (item.to || '').toUpperCase();
        item.income = item.to === account;
        return item;
      })
      .filter(item => (item.from === account) || (item.to === account));
  }

}
