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
    return items
      .sort(this.sortByDate)
      .reverse()
      .filter(item => {
        return ((item.from === this.eth.account.address) || (item.to === this.eth.account.address));
      })
      .map(item => {
        item.income = item.to === this.eth.account.address;
        return item;
      });
  }

  private sortByDate(x, y) {
    return x.date < y.date ? -1 : 1;
  }
}
