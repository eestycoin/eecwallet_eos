import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { QRScaner } from '../../providers/qr-scaner/qr-scaner';

declare var window: any;

interface PermissionResult {
  hasPermission: boolean;
}

// @IonicPage()
@Component({
  selector: 'page-qr-scaner',
  templateUrl: 'qr-scaner.html',
})
export class QrScanerModal {

  private videoEl: HTMLVideoElement;
  public devices = [];

  constructor(
    private platform: Platform,
    private viewCtrl: ViewController,
    private qrScaner: QRScaner,
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
        // console.log(123123, r);
        this.viewCtrl.dismiss({ addr: r });
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

  dissmiss() {
    this.viewCtrl.dismiss();
  }

}


