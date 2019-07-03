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
  coin = environment.coin;
  currencies: string[] = environment.exchange.currencies;
  currenciesOut: string[];
  currencyIn = environment.exchange.currencies[0];
  currencyOut = this.coin;
  returnAddress = '';
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
    this.returnAddress = this.eth.account.address;
  }

  onCurrencyInChange(nextVal: string) {
    const cleanCurrenciesOut = this.currencies.filter(v => v !== environment.coin);
    this.currenciesOut = (nextVal === environment.coin)
      ? cleanCurrenciesOut
      : [environment.coin];
    this.currencyOut = this.currenciesOut[0];
    
    this.onCurrencyOutChange(this.currencyOut);
  }

  onCurrencyOutChange(nextVal: string) {
    this.returnAddress = (nextVal === 'ETH' || nextVal === this.coin) 
      ? this.eth.account.address 
      : '';

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
    if (!this.returnAddress)
      return;

    if (this.currencyOut === 'ETH' && this.amount < 0.02) {
      alert('Amount in ETH can`t be lower than 0.02');
      return;
    }

    this.sloading = true;
    this.exchage.putOrder(this.currencyIn, this.currencyOut, this.amount, this.eth.account.address, this.returnAddress)
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
