import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToasterProvider } from '../../providers/toaster/toaster';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ExchangeProvider } from '../../providers/exchange/exchange';
import { EthProvider } from '../../providers/eth/eth';

import { environment } from '../../app/environment';

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

  isTransferAvailable = false;
  loading = false;

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

    this.db.saveOrder(this.eth.account.address, this.currencyIn + '-' + this.currencyOut, this.amount, this.id)
      .then(order => {
        this.exchange.saveOrder(order);
      });

    if ((this.currencyIn === 'ETH') && (this.eth.account.balanceEth > this.amount)) {
      this.isTransferAvailable = true;
    }

    if ((this.currencyIn === environment.coin) && (this.eth.account.balance > this.amount)) {
      this.isTransferAvailable = true;
    }
  }

  onCopy() {
    this.copy(this.receivingAddress);
    this.toast.showInfo('Address copied successfully');
  }

  onSubmit() {
    this.navCtrl.setRoot('HistoryPage');
  }

  onSubmitTransfer() {
    this.transfer(this.onSubmit);
  }

  private transfer(cb: Function) {
    this.loading = true;

    let func;

    if (!this.isTransferAvailable) return;

    if (this.currencyIn === 'ETH') {
      func = this.eth.buy(this.amount, this.receivingAddress);
    }

    if (this.currencyIn === environment.coin) {
      func = this.eth.tranfer(this.receivingAddress, this.amount);
    }

    if (!func) return;

    func
      .then(() => {
        cb();
      })
      .catch(console.log)
      .finally(() => {
        this.loading = false;
      });
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
