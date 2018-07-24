import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EthProvider } from '../../providers/eth/eth';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  items: Observable<any[]>;
  account: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private eth: EthProvider
  ) {
    // this.items = this.db.collection('items').valueChanges();
  }

  ionViewDidLoad() {
    this.items = this.db
      .collection('items')
      .valueChanges()
      .pipe(map(results => this.mapItems(results)));
  }

  private mapItems(items: any[]) {
    this.account = this.eth.account.address.toUpperCase();
    return items
      .sort(this.sortByDate)
      .reverse()
      .filter(item => {
        return ((item.from.toUpperCase() === this.account) || (item.to.toUpperCase() === this.account));
      })
      .map(item => {
        item.income = item.to.toUpperCase() === this.account;
        return item;
      });
  }

  private sortByDate(x, y) {
    return x.date < y.date ? -1 : 1;
  }
}
