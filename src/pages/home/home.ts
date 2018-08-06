import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance: number = 0;
  account: string = '0x';

  constructor(
    public navCtrl: NavController, 
    public eth: EthProvider
  ) {
    
    // this.eth.onInit().then(r => {
    //   if (!r) 
    //     this.navCtrl.push('Noweb3Page');
    // });
  }

  itemSelected(item: string) {
    this.navCtrl.push(item);
  }

  ionViewDidLoad() {
    if (!this.eth.isLogged())
      this.navCtrl.push('LoginPage');
  }

  async ionViewDidEnter() {
    // console.log('This account', this.account);
  }

  async getBalance() {
    this.balance = await this.eth.getBalance();
  }

}
