import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';


@IonicPage()
@Component({
  selector: 'page-buy-eth',
  templateUrl: 'buy-eth.html',
})
export class BuyEthPage {

  amount: number;
  pack: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider
  ) { }

  ionViewDidLoad() {
    this.amount = this.navParams.get('amount') || 1;
    this.pack = this.navParams.get('pack') || 100;
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
