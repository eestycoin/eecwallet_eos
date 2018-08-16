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
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private faio: FingerprintAIO,
    private rates: RatesProvider,
    private eth: EthProvider
  ) {
    platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.onInit();
        // this.faio
        //   .isAvailable()
        //   .then(() => { 
        //     this.isFaio = true; 
        //     this.onInit();
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     this.eth.detectAccount();
        //   });
      });

    platform.resume
      .subscribe((r: Event) => {
        console.log(r, this.isFaio, this.toMinutes(r.timeStamp));
        if (this.isFaio) {
          this.rootPage = 'SigninPage';
          this.showScan();
        }
      });

    window.location.hash = '/';

    this.rates.onInit();

    this.eth.accountChanged.subscribe(() => this.setRootPage());
  }

  async onInit() {
    try {
      this.isFaio = await this.faio.isAvailable();
      this.showScan();
    } catch (error) {
      console.log(error);
    }
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
      .then((result: any) => {
        console.log(result);
        this.setRootPage();
      })
      .catch((error: string) => {
        console.log(error);
        if (error.search('user') > 0) {

        }
      });
  }

  private toMinutes(time: number): number {
    return Math.floor(time / 1000 / 60);
  }

}

