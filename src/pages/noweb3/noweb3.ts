import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';

import { environment } from '../../app/environment';

import { HomePage } from '../home/home';


enum Networks {'None', 'MainNet', 'Morden', 'Ropsten', 'Rinkeby', 'Kovan'}

@IonicPage()
@Component({
  selector: 'page-noweb3',
  templateUrl: 'noweb3.html',
})
export class Noweb3Page {

  loop: any;
  
  isWeb3: boolean;
  isNetwork: boolean;
  isLoggedIn: boolean;
  networkName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eth: EthProvider) {
  }

  async ionViewDidLoad() {
    this.isWeb3 = true;
    this.networkName = Networks[environment.eth.networkId];
    
    this.checkWeb3();
    this.loop = setInterval(() => {
      this.checkWeb3();
    }, 500);
  }

  async checkWeb3() {
    try {
      this.isLoggedIn = !!(await this.eth.getAccount());
      this.isNetwork = await this.eth.checkNetwork();
    } catch (error) {
      console.log(error);
    }
    if (this.isLoggedIn && this.isNetwork) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewWillLeave() {
    clearInterval(this.loop);
  }

}
