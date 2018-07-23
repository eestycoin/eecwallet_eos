import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  func: Function;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.func = this.navParams.get('func');
  }

  async onSubmit() {
    try {
      const tx = await this.func();
      this.navCtrl.push('ReceiptPage', { tx });
    } catch (error) {
      this.onCancel();
    }
  }

  onCancel() {
    this.navCtrl.pop();
  }

}
