import { Injectable } from '@angular/core';
import QRReader from 'qrreader';


@Injectable()
export class QRScaner {
  private qrReader: QRReader; 
  private interval: 500;

  constructor() {
    this.qrReader = new QRReader();
  }

  public startCapture(videoEl: HTMLElement): Promise<string> {
    return this.qrReader.startCapture(videoEl, this.interval);
  }

  public stopCapture(): void {
    this.qrReader.stopCapture();
  }

}