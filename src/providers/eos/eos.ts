
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

  public account: Account;
  public accountChanged: Subject<Account | null> = new Subject();

  constructor() {
    // TODO: remove
    this.signIn(environment.eos.testkey);
    this.test();
  }

  async onInit() {
    setInterval(this.updateAccount.bind(this), environment.eos.interval);
  }

  async test() {    
    // this.getAccount('eosio.dev').then(console.log);
    // this.getInfo().then(console.log);
    

    setTimeout(() => {
      // this.tr3();
      // this.getAllAccounts().then(console.log); 
    }, 1500);
    

    return true;
  }

  async tr3() {
    try {
      this.transfer(this.account.name, 'eosio.dev', 1, 'test');
    } catch (error) {
      console.log(error);
    }
  }

  

  detectAccount() { }

  setStoredAccount(account: Account) {
    localStorage.setItem('account', JSON.stringify(account));
  }

  getStoredAccount() {
    const accountJSON = localStorage.getItem('account')
    return JSON.parse(accountJSON);
  }

  

  // ------

  init() {

  }

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
      data: { from, to, quantity: quantity + '.0000 ' + environment.coin, memo }
    }];

    return this.api.transact({ actions }, environment.eos.transactOptions)
      .then(console.log)
      .catch(error => {
        console.log(error.message)
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

  // -----

  async signIn(privateKey) {
    this.signatureProvider = new JsSignatureProvider([privateKey]);

    this.api = new Api({
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });

    const address = ecc.privateToPublic(privateKey);
    const name = await this.getKeyAccounts(address);
    const balance = await this.getBalance(name);

    this.account = { address, name, balance, privateKey };

    console.log('SignIn Account', this.account);

    this.accountChanged.next(this.account);
  }

  async signOut() {
    this.account = { address: '', name: '', balance: 0, privateKey: '' };
    this.accountChanged.next(this.account);
  }

  async updateAccount() {
    if (!this.isLogged()) return;

    this.account.balance = await this.getBalance(this.account.name);
  }
}
