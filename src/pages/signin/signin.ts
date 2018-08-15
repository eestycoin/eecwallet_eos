import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  pin: string;
  setPin: boolean;
  loading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider) {
  }

  ionViewDidLoad() {
    this.loading = false;
    this.setPin = this.navParams.get('setPin') || false;
  }

  onSubmit() {
    this.loading = true;
    if (this.pin === localStorage.getItem('pin'))
      this.eth.accountChanged.next();
  }

  onSetPin() {
    this.loading = true;
    localStorage.setItem('pin', this.pin);
    this.eth.detectAccount();
  }

}
