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
  loading = false;
  sloading = false;

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
        this.expected = amount / parseFloat(r);
      }).catch(error => {
        console.log(error);
        this.toast.showError('Not enough liquidity');
        this.expected = 0;
      });
  }

  onSubmit() {
    const returnAddress = '31k7weNRwAWgxjnh2KyEoFXHh1v6T9bo5r';
    this.sloading = true;
    this.exchage.putOrder(this.currencyIn, this.currencyOut, this.amount, this.eth.account.address, returnAddress)
      .then((r: any) => {
        r.amount = this.amount;
        r.currencyIn = this.currencyIn;
        r.currencyOut = this.currencyOut;
        this.navCtrl.push('ExchangeConfirmPage', r);
      }).catch(e => {
        this.sloading = false;
        this.toast.showError(e.error || 'Unknown error');
      });
  }


}
