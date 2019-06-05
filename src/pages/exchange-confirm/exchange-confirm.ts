import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToasterProvider } from '../../providers/toaster/toaster';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ExchangeProvider } from '../../providers/exchange/exchange';
import { EthProvider } from '../../providers/eth/eth';


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
  currencyIn: string;
  currencyOut: string;
  amount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToasterProvider,
    private db: FirebaseProvider,
    private eth: EthProvider,
    private exchange: ExchangeProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('Id');
    this.receivingAddress = this.navParams.get('ReceivingAddress');
    this.price = this.navParams.get('Price');
    this.expiresOn = new Date(this.navParams.get('ExpiresOn'));
    this.amount = this.navParams.get('amount');
    this.currencyIn = this.navParams.get('currencyIn');
    this.currencyOut = this.navParams.get('currencyOut');

    this.db.saveOrder(this.eth.account.address, this.currencyIn + '-' + this.currencyOut, this.amount, this.id);
    this.exchange.saveOrder({
      from: this.eth.account.address,
      to: this.currencyIn + '-' + this.currencyOut, 
      amount: this.amount, 
      orderId: this.id,
      status: 0,
      price: this.price
    });
  }

  onCopy() {
    this.copy(this.receivingAddress);
    this.toast.showInfo('Address copied successfully');
  }

  onSubmit() {
    this.navCtrl.setRoot('HistoryPage');
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
