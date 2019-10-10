import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { EosProvider } from '../../providers/eos/eos';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../models/models';

import { QrScanerModal } from '../qr-scaner/qr-scaner';

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
    public navParams: NavParams,
    public modalController: ModalController,
    private eos: EosProvider,
    private toast: ToasterProvider,
    private db: FirebaseProvider
  ) { }

  ionViewDidLoad() { 
    this.user = this.navParams.get('user') || {};
  }

  async onSubmit() {
    if (!this.privateKey)
      return;

    this.isLoading = true;

    try {
      this.user.addr = this.eos.privateToPublic(this.privateKey);

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
      this.isLoading = false;
      this.toast.showError('Private key is incorrect or wallet doesn’t exist');
    }
  }

  initUser() {
    this.eos.signIn(this.privateKey);
    
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

  async qrScanerPage() {
    const modal = await this.modalController.create(QrScanerModal);
    modal.onDidDismiss(data => {
      this.user.addr = data.addr;
    });
    return await modal.present();
    // this.navCtrl.push('QrScanerPage', { backPage: 'LoginPage' });
  }
}
