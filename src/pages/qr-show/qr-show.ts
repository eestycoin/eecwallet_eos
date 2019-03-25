import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';


@IonicPage()
@Component({
  selector: 'page-qr-show',
  templateUrl: 'qr-show.html',
})
export class QrShowPage {

  qrdata = '';
  level = 'L';
  size = window.innerWidth;

  constructor(public eth: EthProvider) { }

  ionViewDidLoad() { 
    this.qrdata = this.eth.account.address;
    this.size = window.innerWidth;
    console.log(this.qrdata);
  }

}
