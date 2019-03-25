import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrScanerPage } from './qr-scaner';

@NgModule({
  declarations: [
    QrScanerPage,
  ],
  imports: [
    IonicPageModule.forChild(QrScanerPage),
  ],
})
export class QrScanerPageModule {}
