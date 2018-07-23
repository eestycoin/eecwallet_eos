import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';


/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {

  tx: any;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
    this.tx = this.navParams.get('tx');
  }

  onSubmit() {
    this.appCtrl.getRootNavs()[0].setRoot(HomePage);
  }

}
