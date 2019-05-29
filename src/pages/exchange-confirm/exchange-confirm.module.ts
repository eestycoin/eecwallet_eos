import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeConfirmPage } from './exchange-confirm';

@NgModule({
  declarations: [
    ExchangeConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeConfirmPage),
  ],
})
export class ExchangeConfirmPageModule {}
