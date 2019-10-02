import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { RatesProvider } from '../providers/rates/rates';
import { EosProvider } from '../providers/eos/eos';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

import { environment } from './environment';

declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  isFaio = false;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private faio: FingerprintAIO,
    private rates: RatesProvider,
    private eos: EosProvider
  ) {

    history.pushState('', document.title, window.location.pathname + window.location.search);

    this.rates.onInit();

    if (this.platform.is('cordova')) {
      this.platform
        .ready()
        .then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();

          this.onInit();
        });

      this.platform.resume
        .subscribe(() => {
          if (!this.isFaio || window.disableFaio) return;

          this.rootPage = 'SigninPage';
          this.showScan();
        });
    } else {
      // if desktop
      this.onInit();
    }

    this.eos.accountChanged.subscribe(() => this.setRootPage());
  }


  async onInit() {
    try {
      this.isFaio = await this.faio.isAvailable();
      this.showScan();
    } catch (error) {
      console.log(error);
    }

    console.log(123, this.platform)

    if (this.platform.is('core'))
      this.setRootPage();
    else
      this.rootPage = 'SigninPage';
  }

  setRootPage() {
    this.rootPage = this.eos.account.name ? HomePage : 'LoginPage';
  }

  private showScan() {
    this.faio.show(environment.faio)
      .then(() => { this.setRootPage(); })
      .catch(console.log);
  }
}

