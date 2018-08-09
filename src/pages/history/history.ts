import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { EthProvider } from '../../providers/eth/eth';
import { FirebaseProvider } from '../../providers/firebase/firebase';


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
    private db: FirebaseProvider,
    private eth: EthProvider
  ) { }

  ionViewDidLoad() {
    this.items = this.db.getItems(this.eth.account.address);
  }
}
