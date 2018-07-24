import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';

/**
 * Generated class for the BuyEthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-eth',
  templateUrl: 'buy-eth.html',
})
export class BuyEthPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyEthPage');
  }

  onSubmit() {
    try {
      const tx = this.eth.buy(1);
      this.navCtrl.push('ReceiptPage', { tx });
    } catch (error) {
      console.log(error);
    }
  }

}
