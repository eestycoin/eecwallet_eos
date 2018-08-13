import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../app/environment';


@Injectable()
export class BitgoProvider {

  public wallet: any;
  public address: any;

  private currency: string;

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + environment.bitgo.accessToken);

  constructor(public http: HttpClient) { }

  async getWalletAddress(currency: string, label: string) {
    this.currency = currency;
    this.wallet = await this.getDefaultWallet(environment.bitgo.walletIndex);
    return await this.getTopUpAddress(label);
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
      .get(`${environment.bitgo.apiUrl}/${this.currency}/wallet`, { headers: this.headers })
      .toPromise()
      .then((r: any) => r.wallets);
  }

  private getAddresses(walletId: string) {
    return this.http
      .get(`${environment.bitgo.apiUrl}/${this.currency}/wallet/${walletId}/addresses`, { headers: this.headers })
      .toPromise()
      .then((r: any) => r.addresses);
  }

  private createAddress(walletId: string, label: string) {
    return this.http
      .post(`${environment.bitgo.apiUrl}/${this.currency}/wallet/${walletId}/address`, { label }, { headers: this.headers })
      .toPromise();
  }

}
