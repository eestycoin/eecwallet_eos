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

  constructor(public navCtrl: NavController, private eth: EthProvider, private bitgo: BitgoProvider) {
    this.eth.ready.subscribe(account => {
      console.log(account);
      this.balance = account.balance;
      this.account = account.address;

      this.getBalance();
    });

    this.bitgo.onInit();
  }

  itemSelected(item: string) {
    this.navCtrl.push(item);
  }

  async ionViewDidEnter() {
    // await this.eth.onInit();
    
  }

  async getBalance() {
    this.balance = await this.eth.getBalance();
    // this.account = this.eth.getAccount();
  }

}
