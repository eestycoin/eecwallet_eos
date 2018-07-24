import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyBtcPage } from './buy-btc';

@NgModule({
  declarations: [
    BuyBtcPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyBtcPage),
  ],
})
export class BuyBtcPageModule {}
