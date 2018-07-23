import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'v2xef66e4645499a3ff36a7b72816b3c38771a215aeef651d380fdcabcf2492ae00';
//
// v2x341d7b1e23b6369a1b3d0503dfc10febf3c3151028ebd2de272caa58d0b845de
// v2xef66e4645499a3ff36a7b72816b3c38771a215aeef651d380fdcabcf2492ae00
//
/*
  Generated class for the BitgoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BitgoProvider {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + ACCESS_TOKEN)
    .set('x-auth-token', ACCESS_TOKEN);

  constructor(public http: HttpClient) {
    console.log('Hello BitgoProvider Provider');
  }

  onInit() {
    this.getWallets();
  }

  getWallets() {
    this.http.get('/v2/user/session', { headers: this.headers })
      .subscribe(r => {
        console.log(r);
      });
    this.http.get('/v2/tbtc/wallet', { headers: this.headers })
      .subscribe((r:any) => {
        console.log(r);
        console.log(r.wallets[1]);
        const walletId = r.wallets[1].id;
        this.createAddress(walletId, 'test').then(r2 => {
          console.log(r2);
        }).catch(e => {
          console.log(e);
        });
      });
  }

  createAddress(walletId: string, label: string) {
    return this.http.post(`/v2/tbtc/wallet/5b5485bdcf6c08a036ceae31cb2eab89/address`, { label }, { headers: this.headers })
      .toPromise();
  }

}
