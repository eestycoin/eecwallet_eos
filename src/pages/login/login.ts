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

  showRegistration = false;
  isLoading = false;

  constructor(
    public navCtrl: NavController,
    private eth: EthProvider,
    private toast: ToasterProvider,
    private db: FirebaseProvider
  ) { }

  ionViewDidLoad() {

  }

  onSubmit() {
    if (!this.privateKey)
      return;

    this.isLoading = true;

    try {
      this.user.addr = this.eth.privateKeyToAccount(this.privateKey).address;

      if (this.showRegistration) {
        this.db.saveUser(this.user)
          .then(user => {
            this.user = user;
            this.initUser();
          });
      } else
        this.checkUser();
    } catch (error) {
      console.log(error);
      this.toast.showError('Private key is incorrect or wallet doesn’t exist');
    }
  }

  initUser() {
    this.eth.savePrivateKey(this.privateKey);
    this.eth.onInit();
    this.navCtrl.setRoot(HomePage);
  }

  checkUser() {
    if (!this.user.addr)
      return;

    this.db.getUser(this.user).subscribe(r => {
      if (r.exists) {
        this.user = r.data() as User;
        this.initUser();
      } else {
        this.showRegistration = true;
        this.isLoading = false;
      }
    });
  }
}
