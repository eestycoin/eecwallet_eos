import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToasterProvider } from '../../providers/toaster/toaster';


@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  func: Function;
  loading: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toast: ToasterProvider
  ) { }

  ionViewDidLoad() {
    this.loading = false;
    this.func = this.navParams.get('func');
  }

  async onSubmit() {
    try {
      this.loading = true;
      this.navCtrl.push('ReceiptPage', { tx: await this.func() });
    } catch (error) {
      this.onError(error);
      this.onCancel();
    }
  }

  onCancel() {
    this.navCtrl.pop();
  }

  private onError(e: any) {
    this.toast.showError(e);
  }

}
