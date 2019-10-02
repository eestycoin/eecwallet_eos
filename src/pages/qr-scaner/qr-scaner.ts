import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { QRScaner } from '../../providers/qr-scaner/qr-scaner';

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

  private videoEl: HTMLVideoElement;
  private backPage = 'SendPage';

  public devices = [];

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams, 
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
    this.backPage = this.navParams.get('backPage');

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
        const user = { addr: r }
        this.navCtrl.push(this.backPage, { user });
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


