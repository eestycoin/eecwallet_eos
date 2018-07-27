import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { BitgoProvider } from '../../providers/bitgo/bitgo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance: number = 0;
  account: string = '0x';

  constructor(
    public navCtrl: NavController, 
    public eth: EthProvider, 
    private bitgo: BitgoProvider
  ) {
    this.bitgo.onInit().then(() => {
      return this.bitgo.getTopUpAddress('test');
    }).then(r => {
      console.log(r);
    });
    this.eth.onInit().then(r => {
      if (!r) 
        this.navCtrl.push('Noweb3Page');
    });
  }

  itemSelected(item: string) {
    this.navCtrl.push(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  async ionViewDidEnter() {
    console.log('This account', this.account);
  }

  async getBalance() {
    this.balance = await this.eth.getBalance();
  }

}
