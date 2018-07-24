import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyEthPage } from './buy-eth';

@NgModule({
  declarations: [
    BuyEthPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyEthPage),
  ],
})
export class BuyEthPageModule {}
