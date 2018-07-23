import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EthProvider } from '../providers/eth/eth';
import { BitgoProvider } from '../providers/bitgo/bitgo';



const firebase = {
  apiKey: 'AIzaSyBMguwZpwMNKw_Q8-WrUJ5rbNi7hbZKcxo',
  authDomain: 'veiko-77bd8.firebaseapp.com',
  databaseURL: 'https://veiko-77bd8.firebaseio.com',
  projectId: 'veiko-77bd8',
  storageBucket: '',
  messagingSenderId: '264863290527'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EthProvider,
    BitgoProvider
  ]
})
export class AppModule {}
