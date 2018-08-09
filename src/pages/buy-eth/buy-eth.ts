import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { ToasterProvider } from '../../providers/toaster/toaster';


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
    private toast: ToasterProvider
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
      this.onError(error);
    }
  }

  private onError(e: any) {
    this.loading = false;
    this.toast.showError(e);
  }
}
