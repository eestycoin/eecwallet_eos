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
import { QrScanerModal } from '../pages/qr-scaner/qr-scaner';

import { EosProvider } from '../providers/eos/eos';
import { BitgoProvider } from '../providers/bitgo/bitgo';
import { RatesProvider } from '../providers/rates/rates';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ToasterProvider } from '../providers/toaster/toaster';
import { QRScaner } from '../providers/qr-scaner/qr-scaner';

import { environment } from './environment';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QrScanerModal
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
    HomePage,
    QrScanerModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EosProvider,
    BitgoProvider,
    RatesProvider,
    FirebaseProvider,
    ToasterProvider,
    QRScaner,
    AndroidPermissions
  ]
})
export class AppModule { }
