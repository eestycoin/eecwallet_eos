import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { QRScanerWeb } from '../../providers/qr-scaner/qr-scaner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

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
    private qrScaner: QRScanerWeb,
    private qrScanner: QRScanner,
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

    // console.log(123, this.platform.is('cordova'), this.platform.is('ios'));

    if (this.platform.is('cordova') && this.platform.is('ios')) {
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          console.log(status);
          this.startCaptureIos(status);
        })
        .catch((e: any) => {
          console.log('Error is', e);
          this.viewCtrl.dismiss();
        });

      return;
    }

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

  startCaptureIos(status) {
    if (status.authorized) {
      // camera permission was granted
      console.log("scanning")
      window.document.querySelector('ion-app').classList.add('transparentBody')

      // start scanning
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        console.log('Scanned something', text);

        this.viewCtrl.dismiss({ addr: text });

        window.disableFaio = false;

        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning

        window.document.querySelector('ion-app').classList.remove('transparentBody')
      });

      this.qrScanner.show();

    } else if (status.denied) {
      console.log("Denied permission to access camera");
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
    } else {
      console.log("Something else is happening with the camera");
      // permission was denied, but not permanently. You can ask for permission again at a later time.
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


