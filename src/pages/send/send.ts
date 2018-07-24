import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

import { EthProvider } from '../../providers/eth/eth';


/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  addressTo: string = '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123';
  amount: number = 0.000001;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider,
    private db: AngularFirestore
  ) {
    this.eth.ready.subscribe(account => {
      console.log(account);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter SendPage');

    setInterval(() => {
      
    }, 1000);
  }

  // ----

  onSubmit() {
    this.navCtrl.push('ConfirmPage', { func: this.onTransfer.bind(this) })
  }

  onTransfer() {
    return this.eth.tranfer(this.addressTo, this.amount)
      .then(tx => {
        const data = { 
          tx, 
          date: Date.now(), 
          from: this.eth.getAccount(), 
          to: this.addressTo, 
          amount: this.amount 
        };
        this.saveData(data);
        return data;
      });
  }

  saveData(data) {
    const id = this.db.createId();
    const call = this.db.collection('items').doc(id).set(data);
    call.then(docRef => {
      console.log("Document written with TX: ", data.tx);
    }).catch(error => {
      console.error("Error adding document: ", error);
    });
  }

}
