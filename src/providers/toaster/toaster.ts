import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';


@Injectable()
export class ToasterProvider {

  constructor(public toastCtrl: ToastController) { }

  showInfo(message: string, duration = 250) {
    this.toastCtrl
      .create({ message, duration })
      .present();
  }

  showError(e: any, duration = 3000) {
    this.toastCtrl
      .create({ message: e.toString(), duration, showCloseButton: true })
      .present();
  }

}
