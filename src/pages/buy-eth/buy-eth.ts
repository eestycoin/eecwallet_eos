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
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider
  ) { }

  ionViewDidLoad() {
    this.amount = this.navParams.get('amount') || 1;
    this.pack = this.navParams.get('pack') || 100;
  }

  async onSubmit() {
    this.loading = true;
    try {
      const tx = await this.eth.buy(this.amount);
      this.navCtrl.push('ReceiptPage', { tx });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

}
