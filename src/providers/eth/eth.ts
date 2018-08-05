import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';

import { default as Web3 } from 'web3';
import { default as Tx } from 'ethereumjs-tx';

import { environment, erc20abi } from '../../app/environment';


@Injectable()
export class EthProvider {

  account = {
    address: '',
    balance: 0,
    privateKey: environment.eth.testPrivateKey
  }

  ready: Subject<any> = new Subject();

  private erc20: any;
  private web3: Web3;

  constructor() {
    this.onInit();
  }

  // --------------------------------------------

  async onInit() {

    this.initWeb3();

    this.updateAccount();

    this.connectContract();

    setInterval(() => {
      this.updateAccount();
    }, environment.eth.interval);
  }

  async updateAccount() {
    this.account.address = await this.getAccount();
    this.account.balance = await this.getBalance();
  }

  // --------------------------------------------

  isWeb3() {
    return true;
  }

  initWeb3() {
    const provider = (typeof window['web3'] !== 'undefined') 
      ? window['web3'].currentProvider 
      : new Web3.providers.HttpProvider(environment.eth.apiUrl);
    this.web3 = new Web3(provider)
  }

  connectContract() {
    this.erc20 = new this.web3.eth.Contract(erc20abi, environment.eth.contractAddr);
  }

  // --------------------------------------------
  // Async

  async getAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    if (!accounts[0]) {
      const account = this.web3.eth.accounts.privateKeyToAccount('0x' + this.account.privateKey);
      this.web3.eth.accounts.wallet.add(account);
      this.web3.eth.defaultAccount = account.address;
    } else {
      this.web3.eth.defaultAccount = accounts[0];
    }
    this.account.address = this.web3.eth.defaultAccount;
    return this.web3.eth.defaultAccount;
  }

  async getBalance(): Promise<number> {
    return this.erc20.methods
      .balanceOf(this.web3.eth.defaultAccount)
      .call()
      .then(r => parseFloat(this.web3.utils.fromWei(r, 'ether')))
  }

  async checkNetwork(): Promise<boolean> {
    const currentNetwork = await this.web3.eth.net.getId();
    return currentNetwork === environment.eth.networkId;
  }

  async tranfer(addressTo: string, tokens: number) {
    const value = this.web3.utils.toWei(tokens.toString(), 'ether');
    return this.send(addressTo, value)
    // return this.erc20.methods.transfer(addressTo, this.web3.utils.toWei(tokens.toString(), 'ether')).send(opts)
  }

  async buy(amount: number) {
    const transactionObject = {
      to: '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123',
      // value: this.web3.toWei(amount)
    }
    // return this.toPromise(this.web3.eth.sendTransaction, transactionObject);
  }

  async send(receiver: string, value: number) {
    const query = this.erc20.methods.transfer(receiver, value);
    const encodedABI = query.encodeABI();
    const rawTx = {
      nonce: await this.web3.eth.getTransactionCount(this.account.address),
      data: encodedABI,
      from: this.account.address,
      to: this.erc20.options.address,
      value: 0
    };
    const privateKey = Buffer.from(this.account.privateKey, 'hex')
    const tx = new Tx(rawTx);

    tx.gasPrice = 100;
    tx.gasLimit = 60000;
    tx.sign(privateKey);

    const serializedTx = tx.serialize();

    return this.web3.eth
      .sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .once('transactionHash', console.log)
      .on('receipt', console.log);
  }


}
