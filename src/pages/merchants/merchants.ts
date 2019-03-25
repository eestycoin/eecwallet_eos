import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../models/models';



@IonicPage()
@Component({
  selector: 'page-merchants',
  templateUrl: 'merchants.html',
})
export class MerchantsPage {

  $merchants: Subscription;

  merchants: User[];
  rawMerchants: User[];
  
  filter: string = '';

  constructor(private db: FirebaseProvider) { }

  ionViewDidLoad() {
    this.$merchants = this.db.getMerchants().subscribe(r => {
      this.rawMerchants = r;
      this.merchants = this.mapMerchants();
    });
  }

  ionViewDidLeave() {
    if (this.$merchants)
      this.$merchants.unsubscribe();
  }

  getItems(event) {
    this.filter = event.target.value;
    this.merchants = this.mapMerchants();
  }

  private mapMerchants() {
    if (!this.filter)
      return this.rawMerchants;
    return this.rawMerchants
      .filter(merchant => (merchant.name.includes(this.filter)) || (merchant.addr.includes(this.filter)));
  }
}
