import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuySelectPage } from './buy-select';

@NgModule({
  declarations: [
    BuySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(BuySelectPage),
  ],
})
export class BuySelectPageModule {}
