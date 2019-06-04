import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { ExchangeProvider } from '../../providers/exchange/exchange';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public eth: EthProvider,
    private exchange: ExchangeProvider
  ) { }

  itemSelected(item: string) {
    this.navCtrl.push(item);
  }
  copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  signOut() {
    this.eth.signOut();
    this.navCtrl.push('LoginPage');
  }

}
