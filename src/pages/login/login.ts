import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { EthProvider } from '../../providers/eth/eth';
import { ToasterProvider } from '../../providers/toaster/toaster';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  privateKey: string = environment.eth.testPrivateKey;
  userName: string;
  email: string;
  merchantAccount: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider,
    private toast: ToasterProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit() {
    try {
      const t = this.eth.privateKeyToAccount(this.privateKey);
      this.eth.savePrivateKey(this.privateKey);
      this.eth.onInit();
      this.navCtrl.setRoot(HomePage);
    } catch (error) {
      console.log(error);
      this.toast.showError('Private key is incorrect or wallet doesn’t exist');
    }
  }

}
