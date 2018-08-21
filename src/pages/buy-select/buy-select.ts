import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RatesProvider } from '../../providers/rates/rates';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-buy-select',
  templateUrl: 'buy-select.html',
})
export class BuySelectPage {

  currencies = environment.membership.currencies;
  quote = environment.rates.defaultQuote;
  pack: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rates: RatesProvider
  ) { }

  ionViewDidLoad() {
    this.pack = this.navParams.get('pack') || 100;
  }

  onSelect(currency: string, pack = this.pack) {
    const amount = this.pack / this.rates.list[currency];
    const selected = (currency === 'ETH') ? 'ETH' : 'BTC';
    const page = `Buy${this.capitalize(selected)}Page`;

    this.navCtrl.push(page, { amount, pack, currency });
  }

  onSelectFiat(pack = this.pack) {
    const amount = this.pack / this.rates.list[environment.coin];
    
    this.navCtrl.push('BuyPaypalPage', { amount, pack });
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  }

}
