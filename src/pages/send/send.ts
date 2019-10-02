import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EosProvider } from '../../providers/eos/eos';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../models/models';


@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  merchant: User;

  addressTo: string = ''; //environment.eth.wallet;
  addressToDisabled = false;
  nameTo: string = '';
  nameToDisabled = false;
  amount: number = 1;
  max = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eos: EosProvider,
    private db: FirebaseProvider
  ) {
    this.max = this.eos.account.balance;
  }

  ionViewDidLoad() {
    this.merchant = this.navParams.get('user');

    if (this.merchant)
      this.addressTo = this.merchant.addr;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    // const el = <HTMLInputElement>event.srcElement;
    // el.value = el.value.replace(/[^0-9]/g, '');
  }

  async onSubmit() {
    if (!this.amount || (!this.addressTo && !this.nameTo))
      return;

    if (!!this.addressTo)
      this.nameTo = await this.eos.getKeyAccounts(this.addressTo);

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
    return this.eos
      .transfer(this.eos.account.name, this.nameTo, this.amount, '')
      .then((tx: any) => {
        console.log('onTransfer', tx);
        this.db.saveItem(tx.transaction_id, this.eos.account.address, this.nameTo, this.amount);
        return { tx: tx.transaction_id, from: this.eos.account.name, to: this.nameTo, amount: this.amount };
      });
  }

}
