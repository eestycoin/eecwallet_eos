import { Injectable } from '@angular/core';

import QRReader from 'qrreader';

// import QRReader from './temp';


@Injectable()
export class QRScanerWeb {
  private qrReader: QRReader; 
  private interval: 500;

  constructor() {
    try {
      this.qrReader = new QRReader();
    } catch (error) {
      console.log(error);
    }
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