import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QRScaner } from '../../providers/qr-scaner/qr-scaner';
import { EthProvider } from '../../providers/eth/eth';

@IonicPage()
@Component({
  selector: 'page-qr-scaner',
  templateUrl: 'qr-scaner.html',
})
export class QrScanerPage {

  width = window.innerWidth;
  heigth = window.innerWidth;

  devices = [];

  constructor(
    private navCtrl: NavController, 
    private qrScaner: QRScaner,
    private eth: EthProvider,
  ) { }

  ionViewDidLoad() {
    const videoEl = document.getElementsByClassName('qrviewport')[0] as HTMLElement;

    this.qrScaner.getVideoInputDevices()
      .then(r => {
        this.devices = r;
        console.log(r);
      });

    this.qrScaner.startCapture(videoEl)
      .then(r => {
        if (this.eth.isAddress(r)) {
          const user = { addr: r }
          this.navCtrl.push('SendPage', { user });
        } else {
          alert('invalid qr code');
        }
      });
  }

  ionViewWillLeave() {
    this.qrScaner.stopCapture();
  }

  switch() {
    this.qrScaner.stopAndSwitchCamera();
    this.ionViewDidLoad();
  }

}


