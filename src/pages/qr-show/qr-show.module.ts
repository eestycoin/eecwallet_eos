import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRCodeModule } from 'angularx-qrcode';

import { QrShowPage } from './qr-show';

@NgModule({
  declarations: [
    QrShowPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(QrShowPage),
  ],
})
export class QrShowPageModule {}
