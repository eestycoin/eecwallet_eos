import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyPaypalPage } from './buy-paypal';

@NgModule({
  declarations: [
    BuyPaypalPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyPaypalPage),
  ],
})
export class BuyPaypalPageModule {}
