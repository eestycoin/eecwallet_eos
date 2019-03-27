import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRScaner } from '../../providers/qr-scaner/qr-scaner';
import { QrScanerPage } from './qr-scaner';

@NgModule({
  declarations: [
    QrScanerPage,
  ],
  imports: [
    IonicPageModule.forChild(QrScanerPage),
  ],
  providers: [
    QRScaner
  ]
})
export class QrScanerPageModule {}
