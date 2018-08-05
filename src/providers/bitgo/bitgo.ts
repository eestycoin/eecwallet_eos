import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../app/environment';


@Injectable()
export class BitgoProvider {

  public wallet: any;
  public address: any;

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + environment.bitgo.accessToken);

  constructor(public http: HttpClient) { }

  async onInit() {
    this.wallet = await this.getDefaultWallet(environment.bitgo.walletIndex);
  }

  async getTopUpAddress(label: string) {
    return await this.getAddressByLabel(label) || await this.createAddress(this.wallet.id, label);
  }

  async getDefaultWallet(idx = 0) {
    return (await this.getWallets())[idx];
  }

  async getAddressByLabel(label: string) {
    return (await this.getAddresses(this.wallet.id)).find(v => v.label === label);
  }

  // ---------------------------------------------------------------------------------------------
  // API calls / private functions

  private getWallets() {
    return this.http
      .get(`${environment.bitgo.apiUrl}/tbtc/wallet`, { headers: this.headers })
      .toPromise()
      .then((r: any) => r.wallets);
  }

  private getAddresses(walletId: string) {
    return this.http
      .get(`${environment.bitgo.apiUrl}/tbtc/wallet/${walletId}/addresses`, { headers: this.headers })
      .toPromise()
      .then((r: any) => r.addresses);
  }

  private createAddress(walletId: string, label: string) {
    return this.http
      .post(`${environment.bitgo.apiUrl}/tbtc/wallet/${walletId}/address`, { label }, { headers: this.headers })
      .toPromise();
  }

}
