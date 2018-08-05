import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  func: Function;
  loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.func = this.navParams.get('func');
  }

  async onSubmit() {
    try {
      this.loading = true;
      const tx = await this.func();
      this.navCtrl.push('ReceiptPage', { tx });
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.onCancel();
    }
  }

  onCancel() {
    this.navCtrl.pop();
  }

}
