import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
    private db: AngularFirestore
  ) {
    // this.items = this.db.collection('items').valueChanges();
  }

  ionViewDidLoad() {
    this.items = this.db
      .collection('items')
      .valueChanges()
      .pipe(map(results => results.sort(this.sort).reverse()));
  }

  // private next() {
  //   return map(results => results.sort(this.sort).reverse())
  // }

  private sort(x, y) {
    return x.date < y.date ? -1 : 1;
  }
}
