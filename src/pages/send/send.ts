import { Component, HostListener } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { EosProvider } from '../../providers/eos/eos';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../models/models';

import { QrScanerModal } from '../qr-scaner/qr-scaner';


@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  merchant: User;

  addressTo: string = '';
  addressToDisabled = false;
  nameTo: string = '';
  nameToDisabled = false;
  amount = 1;
  max = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
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

  async qrScanerPage() {
    const modal = await this.modalController.create(QrScanerModal);
    modal.onDidDismiss(data => {
      // console.log(data);
      this.addressTo = data.addr;
    });
    return await modal.present();
    // this.navCtrl.push('QrScanerPage', { backPage: 'SendPage' });
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
        console.log(tx)
        if (!tx.error)
          this.db.saveItem(tx.transaction_id, this.eos.account.name, this.nameTo, this.amount);
          
        return { tx: tx.transaction_id, from: this.eos.account.name, to: this.nameTo, amount: this.amount, error: tx.error };
      });
  }

}
