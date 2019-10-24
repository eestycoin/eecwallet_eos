
import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';

import ecc from 'eosjs-ecc';
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';


import { Account } from './interface';

import { environment } from '../../app/environment';

@Injectable()
export class EosProvider {

  private api: Api;
  private signatureProvider: JsSignatureProvider;
  private rpc: JsonRpc = new JsonRpc(environment.eos.nodeUrl);

  private interval: any;
  private emptyAccount = { address: '', name: '', balance: 0, privateKey: '' };

  public account: Account;
  public accountChanged: Subject<Account | null> = new Subject();

  constructor() { 
    const account: Account | null = this.getStoredAccount();
    
    if (account) {
      this.account = account;
      this.initApi(account.privateKey);
    }
  }

  // ------

  setStoredAccount(account: Account) {
    localStorage.setItem('account', JSON.stringify(account));
  }

  getStoredAccount() {
    const accountJSON = localStorage.getItem('account')
    return (accountJSON && JSON.parse(accountJSON)) || null ;
  }

  clearStoredAccount() {
    localStorage.removeItem('account');
  }

  // ------

  isLogged() {
    return !!this.account.name;
  }

  // ------

  getInfo() {
    return this.rpc.get_info();
  }

  getAccount(accountName) {
    return this.rpc.get_account(accountName);
  }

  getBalance(accountName) {
    return this.rpc.get_currency_balance(environment.eos.contractName, accountName, environment.coin)
      .then(r => parseInt(r[0]));
  }

  getAllAccounts() {
    return this.getTableRows('accounts', 10);
  }

  getKeyAccounts(address: string) {
    return this.rpc.history_get_key_accounts(address)
      .then(r => r.account_names[0]);
  }

  getContract() {
    return this.api.getContract(environment.eos.contractName);
  }

  // ------  

  transfer(from: string, to: string, quantity: number, memo: string) {
    const actions = [{
      account: environment.eos.contractName,
      name: 'transfer',
      authorization: [{ actor: from,  permission: 'active' }],
      data: { from, to, quantity: quantity.toFixed(6) + ' ' + environment.coin, memo }
    }];

    return this.api.transact({ actions }, environment.eos.transactOptions)
      .then(r => {
        this.updateAccount();
        return r;
      })
      .catch(error => {
        console.log(error.message);
        return { error: error.message };
      });
  }

  getTableRows(table, limit) {
    return this.rpc.get_table_rows({
      table,
      limit,
      code: environment.eos.contractName,
      scope: this.account.name,
      json: true,
      reverse: false,
      show_payer: false
    }); 
  }

  privateToPublic(privateKey: string) {
    return ecc.privateToPublic(privateKey);
  }

  // -----

  initApi(privateKey) {
    this.signatureProvider = new JsSignatureProvider([privateKey]);

    this.api = new Api({
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
  }

  // -----

  async signIn(privateKey) {
    this.initApi(privateKey);

    const address = this.privateToPublic(privateKey);
    const name = await this.getKeyAccounts(address);
    const balance = await this.getBalance(name);

    this.account = { address, name, balance, privateKey };

    this.accountChanged.next(this.account);

    this.setStoredAccount(this.account);
    this.interval = setInterval(this.updateAccount.bind(this), environment.eos.interval);

    return this.account;
  }

  async signOut() {
    this.accountChanged.next(this.emptyAccount);

    this.interval && clearInterval(this.interval);
    this.clearStoredAccount();
  }

  async updateAccount() {
    if (!this.isLogged()) return;

    this.account.balance = await this.getBalance(this.account.name);
  }

  reInitAccount() {
    this.account = this.account || this.emptyAccount;
    this.accountChanged.next(this.account);

    this.interval = setInterval(this.updateAccount.bind(this), environment.eos.interval);
  }
}
