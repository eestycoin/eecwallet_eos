import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { RatesProvider } from '../providers/rates/rates';
import { EthProvider } from '../providers/eth/eth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private rates: RatesProvider,
    private eth: EthProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    this.rates.onInit();

    this.eth.accountChanged.subscribe(() => this.setRootPage());
    this.eth.updateAccount();
  }

  async setRootPage() {
    const account = await this.eth.getAccount();
    if (account) {
      this.eth.onInit();
      this.rootPage = HomePage;
    } else {
      this.rootPage = this.eth.embedded ? 'Noweb3Page' : 'LoginPage';
    }
  }

}

