import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

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
    console.log('ionViewDidLoad HistoryPage');
    this.items = this.db.collection('items').valueChanges();
    console.log(this.items);
  }

}
