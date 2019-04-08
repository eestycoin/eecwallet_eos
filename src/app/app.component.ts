import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { RatesProvider } from '../providers/rates/rates';
import { EthProvider } from '../providers/eth/eth';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

import { environment } from './environment';

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
    private eth: EthProvider
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
          if (!this.isFaio) return;
          this.rootPage = 'SigninPage';
          this.showScan();
        });
    }


    this.eth.accountChanged.subscribe(() => this.setRootPage());
  }


  async onInit() {
    try {
      this.isFaio = await this.faio.isAvailable();
      this.showScan();
    } catch (error) {
      console.log(error);
    }

    if (this.platform.is('core'))
      this.eth.detectAccount();
    else
      this.rootPage = 'SigninPage';
  }

  async setRootPage() {
    const account = await this.eth.getAccount();
    const checkNetwork = await this.eth.checkNetwork();
    if (account && checkNetwork) {
      this.eth.onInit();
      this.rootPage = HomePage;
    } else {
      this.rootPage = this.eth.embedded ? 'Noweb3Page' : 'LoginPage';
    }
  }

  private showScan() {
    this.faio.show(environment.faio)
      .then(() => { this.setRootPage(); })
      .catch(console.log);
  }

  private toMinutes(time: number): number {
    return Math.floor(time / 1000 / 60);
  }

}

