import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

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
    private eth: EthProvider,
    private toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    this.amount = this.navParams.get('amount') || 0.1;
    this.pack = this.navParams.get('pack') || 100;
  }

  async onSubmit() {
    this.loading = true;
    try {
      const tx = await this.eth.buy(this.amount);
      tx['value'] = this.amount;
      this.navCtrl.push('ReceiptPage', { tx });
    } catch (error) {
      console.log(error);
      this.onError(error);
      this.loading = false;
    }
  }

  private onError(e: any) {
    const toast = {
      message: e.toString(),
      duration: 3000,
      showCloseButton: true
    }
    this.toastCtrl
      .create(toast)
      .present();
  }
}
