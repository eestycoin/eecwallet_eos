import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

/**
 * Generated class for the BuyBtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-btc',
  templateUrl: 'buy-btc.html',
})
export class BuyBtcPage {

  addressBtc = '2N8p9ZSrQ53AswQWw1oyXUhg5X3mnK4oFtt';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyBtcPage');
  }

  copy() {
    window['Clipboard'].copy(this.addressBtc);
    const toast = this.toastCtrl.create({
      message: 'Address copied successfully',
      duration: 250
    });
    toast.present();
  }
}



window['Clipboard'] = (function(window, document, navigator) {
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

  copy = function(text) {
      createTextArea(text);
      selectText();
      copyToClipboard();
  };

  return {
      copy: copy
  };
})(window, document, navigator);