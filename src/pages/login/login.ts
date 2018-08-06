import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { EthProvider } from '../../providers/eth/eth';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  privateKey: string = environment.eth.testPrivateKey;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit() {
    console.log('onSubmit');
    this.eth.savePrivateKey(this.privateKey);
    this.navCtrl.setRoot(HomePage);
  }

}
