import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import QRReader from 'qrreader';

// import QRReader from './temp';


@Injectable()
export class QRScaner {
  private qrReader: QRReader; 
  private interval: 500;

  constructor(private qrScanner: QRScanner) {
    // this.qrReader = new QRReader();

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        console.log(status);
      })
      .catch((e: any) => console.log('Error is', e));
  }

  public startCapture(videoEl: HTMLElement): Promise<string> {
    this.qrReader = new QRReader();
    return this.qrReader.startCapture(videoEl, this.interval);
  }

  public stopCapture(): void {
    this.qrReader.stopCapture();
  }

  public stopAndSwitchCamera() {
    this.qrReader.stopAndSwitchCamera();
  }

  public getVideoInputDevices() {
    return this.qrReader.getVideoInputDevices();
  }

}