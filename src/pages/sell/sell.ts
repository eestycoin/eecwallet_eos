import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  addressTo: string = environment.eth.wallet;
  amount: number = 0.000001;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider,
    private db: FirebaseProvider
  ) { }

  onSubmit() {
    if (!this.amount || !this.addressTo)
      return;

    this.navCtrl.push('ConfirmPage', { func: this.onTransfer.bind(this) })
  }

  async onTransfer() {
    return this.eth
      .tranfer(this.addressTo, this.amount)
      .then(tx => this.db.saveItem(tx.transactionHash, this.eth.account.address, this.addressTo, this.amount));
  }

}
