import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { QRScaner } from '../../providers/qr-scaner/qr-scaner';
import { EthProvider } from '../../providers/eth/eth';

declare var window: any;

interface PermissionResult {
  hasPermission: boolean;
}

@IonicPage()
@Component({
  selector: 'page-qr-scaner',
  templateUrl: 'qr-scaner.html',
})
export class QrScanerPage {

  width = window.innerWidth;
  heigth = window.innerWidth;

  devices = [];

  videoEl: HTMLVideoElement;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private qrScaner: QRScaner,
    private eth: EthProvider,
    private androidPermissions: AndroidPermissions,
  ) { }

  requestPermissions() {
    return this.androidPermissions
      .requestPermissions([this.androidPermissions.PERMISSION.CAMERA])
  }

  async checkPermission() {
    try {
      await this.platform.ready();
      const result: PermissionResult = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA);

      if (!result.hasPermission)
        await this.requestPermissions();

      this.startCapture();

    } catch (error) {
      console.log(error);
    }
  }

  ionViewDidLoad() {
    window.disableFaio = true;

    this.videoEl = document.getElementsByClassName('qrviewport')[0] as HTMLVideoElement;

    this.qrScaner.getVideoInputDevices()
      .then(r => {
        this.devices = r;
        console.log('getVideoInputDevices', r);
      });

    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.checkPermission();
    }

    if (!this.platform.is('cordova')) {
      this.startCapture();
    }
  }


  startCapture() {
    this.qrScaner.startCapture(this.videoEl)
      .then(r => {
        if (this.eth.isAddress(r)) {
          const user = { addr: r }
          this.navCtrl.push('SendPage', { user });
        } else {
          alert('invalid qr code');
        }
      }).catch(console.log);
  }

  ionViewWillLeave() {
    this.qrScaner.stopCapture();
    window.disableFaio = false;
  }

  switch() {
    this.qrScaner.stopAndSwitchCamera();
    this.ionViewDidLoad();
  }

}


