import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';

/**
 * Generated class for the Noweb3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

enum Networks {'MainNet', 'Morden', 'Ropsten', 'Rinkeby', 'Kovan'}

@IonicPage()
@Component({
  selector: 'page-noweb3',
  templateUrl: 'noweb3.html',
})
export class Noweb3Page {

  isWeb3: boolean;
  isNetwork: boolean;
  networkName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eth: EthProvider) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad Noweb3Page');
    this.isWeb3 = this.eth.isWeb3();
    this.networkName = Networks[this.eth.network];
    try {
      this.isNetwork = await this.eth.checkNetwork();
    } catch (error) {
      this.isNetwork = false;
    }
    
  }

}
