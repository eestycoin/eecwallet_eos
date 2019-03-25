import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { EthProvider } from '../../providers/eth/eth';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../models/models';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  privateKey: string = environment.eth.testPrivateKey;

  user: User = {
    name: '',
    email: '',
    country: '',
    addr: '',
    merchant: false
  };

  constructor(
    public navCtrl: NavController,
    private eth: EthProvider,
    private toast: ToasterProvider,
    private db: FirebaseProvider
  ) { }

  ionViewDidLoad() { }

  onSubmit() {
    try {
      this.user.addr = this.eth.privateKeyToAccount(this.privateKey).address;
      this.eth.savePrivateKey(this.privateKey);
      this.eth.onInit();
      this.db.saveUser(this.user);
      this.navCtrl.setRoot(HomePage);
    } catch (error) {
      console.log(error);
      this.toast.showError('Private key is incorrect or wallet doesn’t exist');
    }
  }
}
