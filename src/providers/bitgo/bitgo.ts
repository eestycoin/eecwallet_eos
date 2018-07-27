import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'v2x8473d567ae7b4bff3895cdf4dca67a85c53f0aabad726d6061794505d32b16a3';
const API = 'https://veiko-wallet-proxy.vareger.com/api/v2';

// v2x341d7b1e23b6369a1b3d0503dfc10febf3c3151028ebd2de272caa58d0b845de
// v2xef66e4645499a3ff36a7b72816b3c38771a215aeef651d380fdcabcf2492ae00
// v2x8473d567ae7b4bff3895cdf4dca67a85c53f0aabad726d6061794505d32b16a3


@Injectable()
export class BitgoProvider {

  public wallet: any;
  public address: any;
  readonly walletIndex = 0;

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + ACCESS_TOKEN);

  constructor(public http: HttpClient) {
    console.log('Hello BitgoProvider Provider');
  }

  async onInit() {
    this.wallet = await this.getDefaultWallet(this.walletIndex);
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
      .get(`${API}/tbtc/wallet`, { headers: this.headers })
      .toPromise()
      .then((r: any) => r.wallets);
  }

  private getAddresses(walletId: string) {
    return this.http
      .get(`${API}/tbtc/wallet/${walletId}/addresses`, { headers: this.headers })
      .toPromise()
      .then((r: any) => r.addresses);
  }

  private createAddress(walletId: string, label: string) {
    return this.http
      .post(`${API}/tbtc/wallet/${walletId}/address`, { label }, { headers: this.headers })
      .toPromise();
  }

  private getSession() {
    return this.http
      .get(`${API}/user/session`, { headers: this.headers })
      .toPromise(); 
  }

}
