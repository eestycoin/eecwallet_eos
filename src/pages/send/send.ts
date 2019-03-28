import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../models/models';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  merchant: User;

  addressTo: string = environment.eth.wallet;
  amount: number = 1;
  max = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider,
    private db: FirebaseProvider
  ) { 
    this.max = this.eth.account.balance;
  }

  ionViewDidLoad() {
    this.merchant = this.navParams.get('user');
    if (this.merchant)
      this.addressTo = this.merchant.addr;
  }

  @HostListener('input', ['$event'])
    onInput(event: Event) {
      const el = <HTMLInputElement>event.srcElement;
      el.value = el.value.replace(/[^0-9]/g, '');
    }

  onSubmit() {
    if (!this.amount || !this.addressTo)
      return;

    this.navCtrl.push('ConfirmPage', { func: this.onTransfer.bind(this) })
  }

  qrScanerPage() {
    this.navCtrl.push('QrScanerPage');
  }


  onChange(e: number) {
    // setTimeout(() => {
    //   this.amount = (this.amount >= this.max) ? Math.ceil(this.max) : this.amount;
    // });
  }

  async onTransfer() {
    return this.eth
      .tranfer(this.addressTo, this.amount)
      .then(tx => this.db.saveItem(tx.transactionHash, this.eth.account.address, this.addressTo, this.amount));
  }

}
