import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyBtcPage } from './buy-btc';

import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    BuyBtcPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyBtcPage),
    QRCodeModule
  ],
})
export class BuyBtcPageModule {}
