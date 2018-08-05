import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { RatesProvider } from '../../providers/rates/rates';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  membership = environment.membership;
  coin = environment.coin;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rates: RatesProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
  }

  onSelect(pack: number) {
    this.navCtrl.push('BuySelectPage', { pack });
  }
}
