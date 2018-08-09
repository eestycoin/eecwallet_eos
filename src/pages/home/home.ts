import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public eth: EthProvider
  ) { }

  itemSelected(item: string) {
    this.navCtrl.push(item);
  }

  signOut() {
    this.eth.signOut();
    this.navCtrl.push('LoginPage');
  }

}
