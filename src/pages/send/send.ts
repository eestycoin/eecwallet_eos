import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  addressTo: string = location.hostname === 'localhost' ? '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123' : '';
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
