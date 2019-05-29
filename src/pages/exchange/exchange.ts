import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { ExchangeProvider } from '../../providers/exchange/exchange';
import { ToasterProvider } from '../../providers/toaster/toaster';

import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {

  currencies: string[] = environment.exchange.currencies;
  currenciesOut: string[];
  currencyIn = environment.exchange.currencies[0];
  currencyOut = environment.coin;
  amount = 0.01;
  expected = 0;

  constructor(
    public navCtrl: NavController,
    private eth: EthProvider,
    private exchage: ExchangeProvider,
    private toast: ToasterProvider
  ) {
    this.onCurrencyInChange(this.currencyIn);
    this.onAmountChange(this.amount.toString());
  }

  onCurrencyInChange(nextVal: string) {
    const cleanCurrenciesOut = this.currencies.filter(v => v !== environment.coin);
    this.currenciesOut = (nextVal === environment.coin)
      ? cleanCurrenciesOut
      : [environment.coin];
    console.log(this.currenciesOut, this.currenciesOut[0]);
    this.currencyOut = this.currenciesOut[0];
    this.onAmountChange(this.amount.toString());
  }

  onCurrencyOutChange(nextVal: string) {
    this.onAmountChange(this.amount.toString());
  }

  onAmountChange(nextVal: string) {
    const amount = parseFloat(nextVal);
    if (!amount) {
      this.expected = 0;
      return;
    }

    this.exchage.getPrice(this.currencyIn, this.currencyOut, amount)
      .then((r: string) => {
        console.log(r);
        this.expected = amount / parseFloat(r);
      }).catch(error => {
        console.log(error);
        this.toast.showError('Not enough liquidity');
        this.expected = 0;
      });
  }

  onSubmit() {
    console.log(this.eth.account.address);
    const returnAddress = '31k7weNRwAWgxjnh2KyEoFXHh1v6T9bo5r';
    console.log( this.eth.account.address);
    this.exchage.putOrder(this.currencyIn, this.currencyOut, this.amount, this.eth.account.address, returnAddress)
      .then(r => {
        console.log(r);
        this.navCtrl.push('ExchangeConfirmPage', r);
      }).catch(e => {
        console.log(e.error);
        this.toast.showError(e.error || 'Unknown error');
      });
  }


}
