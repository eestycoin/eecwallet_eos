import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';


/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  addressTo: string = '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123';
  amount: number = 0.000001;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eth: EthProvider) {
    this.eth.ready.subscribe(account => {
      console.log(account);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SendPage');
  }

  // ----

  onSubmit() {
    this.navCtrl.push('ConfirmPage', { func: this.onTransfer.bind(this) })
  }

  onTransfer() {
    return this.eth.tranfer(this.addressTo, this.amount);
  }

}
