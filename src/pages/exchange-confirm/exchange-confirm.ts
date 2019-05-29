import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToasterProvider } from '../../providers/toaster/toaster';


@IonicPage()
@Component({
  selector: 'page-exchange-confirm',
  templateUrl: 'exchange-confirm.html',
})
export class ExchangeConfirmPage {

  id: string;
  price: number;
  receivingAddress: string;
  expiresOn: Date;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToasterProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('Id');
    this.receivingAddress = this.navParams.get('ReceivingAddress');
    this.price = this.navParams.get('Price');
    this.expiresOn = new Date(this.navParams.get('ExpiresOn'));

    console.log(this.id, this.receivingAddress, this.price, this.expiresOn);
  }

  onCopy() {
    this.copy(this.receivingAddress);
    this.toast.showInfo('Address copied successfully');
  }

  private copy(val: string) {
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

}
