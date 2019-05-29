import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { EthProvider } from '../providers/eth/eth';
import { BitgoProvider } from '../providers/bitgo/bitgo';
import { RatesProvider } from '../providers/rates/rates';
import { ExchangeProvider } from '../providers/exchange/exchange';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ToasterProvider } from '../providers/toaster/toaster';

import { environment } from './environment';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, environment.ionic),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EthProvider,
    BitgoProvider,
    RatesProvider,
    ExchangeProvider,
    FirebaseProvider,
    ToasterProvider,
    AndroidPermissions
  ]
})
export class AppModule { }
