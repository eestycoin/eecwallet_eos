import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { EosProvider } from '../../providers/eos/eos';


@IonicPage()
@Component({
  selector: 'page-qr-show',
  templateUrl: 'qr-show.html',
})
export class QrShowPage {

  public qrdata = '';
  public level = 'L';
  public size = window.innerWidth;

  constructor(public eos: EosProvider) { }

  ionViewDidLoad() { 
    this.qrdata = this.eos.account.address;
    this.size = window.innerWidth * 0.75;
  }
}
