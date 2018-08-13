import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { BitgoProvider } from '../../providers/bitgo/bitgo';
import { ToasterProvider } from '../../providers/toaster/toaster';


@IonicPage()
@Component({
  selector: 'page-buy-btc',
  templateUrl: 'buy-btc.html',
})
export class BuyBtcPage {

  amount: number;
  pack: number;
  currency: string;
  loading: boolean;
  addressBtc = '...';
  error = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToasterProvider,
    private bitgo: BitgoProvider,
    private eth: EthProvider
  ) { }

  async ionViewDidLoad() {

    this.loading = true;

    this.amount = this.navParams.get('amount') || 1;
    this.pack = this.navParams.get('pack') || 100;
    this.currency = this.navParams.get('currency') || 'BTC';

    const label = this.eth.account.address;
    const currency = 't' + this.currency.toLowerCase();

    try {
      const wallet = await this.bitgo.getWalletAddress(currency, label);
      this.addressBtc = wallet.address;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  copy() {
    window['Clipboard'].copy(this.addressBtc);
    this.toast.showInfo('Address copied successfully');
  }
}



window['Clipboard'] = (function (window, document, navigator) {
  var textArea,
    copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range,
      selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy
  };
})(window, document, navigator);