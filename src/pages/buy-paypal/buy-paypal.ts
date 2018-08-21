import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { environment } from '../../app/environment';

declare var paypal: any;

@IonicPage()
@Component({
  selector: 'page-buy-paypal',
  templateUrl: 'buy-paypal.html',
})
export class BuyPaypalPage {

  data = environment.paypal;
  amount: number;
  pack: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.data.payment = this.payment.bind(this);
    this.data.onAuthorize = this.onAuthorize.bind(this);
  }

  ionViewDidLoad() {
    this.amount = this.navParams.get('amount') || 1;
    this.pack = this.navParams.get('pack') || 100;

    this.initPaypal();
  }

  private initPaypal() {
    paypal.Button.render(this.data, '#paypal-button-container');
    console.log(this.amount.toFixed(2).toString());
  }

  // payment() is called when the button is clicked
  private payment(data, actions) {

    // Make a call to the REST api to create the payment
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: { total: this.amount.toFixed(2).toString(), currency: 'USD' }
          }
        ]
      }
    });
  }

  // onAuthorize() is called when the buyer approves the payment
  private onAuthorize(data, actions) {
    // Make a call to the REST api to execute the payment
    return actions.payment
      .execute()
      .then(() => {
        window.alert('Payment Complete!');
      });
  }
}
