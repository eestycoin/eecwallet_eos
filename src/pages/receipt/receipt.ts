import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {

  data: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.data = this.navParams.get('tx') || {};
    this.data.date = Date.now();
  }

  onSubmit() {
    this.navCtrl.setRoot(HomePage);
  }

}
