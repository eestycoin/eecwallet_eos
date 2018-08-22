import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';

import { default as Web3 } from 'web3';
import { default as Tx } from 'ethereumjs-tx';

import { environment, erc20abi } from '../../app/environment';


@Injectable()
export class EthProvider {

  account = {
    address: undefined,
    balance: 0,
    privateKey: this.getPrivateKey()
  }

  accountChanged: Subject<any> = new Subject();

  lastTx: string;

  private erc20: any;
  private web3: Web3;

  embedded: boolean;

  constructor() {
    this.initWeb3();
    this.connectContract();
  }

  // --------------------------------------------

  async onInit() {
    this.updateAccount();
    setInterval(() => {
      if (this.isLogged())
        this.updateAccount();
    }, environment.eth.interval);
  }

  // --------------------------------------------

  initWeb3() {
    this.embedded = typeof window['web3'] !== 'undefined';
    const provider = this.embedded
      ? window['web3'].currentProvider
      : new Web3.providers.HttpProvider(environment.eth.apiUrl);
    this.web3 = new Web3(provider);
  }

  connectContract() {
    this.erc20 = new this.web3.eth.Contract(erc20abi, environment.eth.contractAddr);
  }

  savePrivateKey(privateKey: string) {
    localStorage.setItem('key', privateKey);
    this.account.privateKey = privateKey;
  }

  getPrivateKey() {
    return localStorage.getItem('key');
  }

  isLogged() {
    return this.embedded || this.getPrivateKey();
  }

  signOut() {
    localStorage.removeItem('key');
    this.account = { address: null, balance: 0, privateKey: null };
  }

  privateKeyToAccount(privateKey: string) {
    return this.web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
  }

  // --------------------------------------------
  // Async

  async getAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();

    if (!accounts[0] && !this.embedded) {
      // console.log(accounts[0], this.getPrivateKey());
      if (!this.getPrivateKey()) return null;
      const account = this.web3.eth.accounts.privateKeyToAccount('0x' + this.account.privateKey);
      this.web3.eth.accounts.wallet.add(account);
      this.web3.eth.defaultAccount = account.address;
    } else {
      this.web3.eth.defaultAccount = accounts[0];
    }
    this.account.address = this.web3.eth.defaultAccount;

    return this.web3.eth.defaultAccount;
  }

  async detectAccount() {
    const oldAccountAddress = this.account.address;
    try {
      this.account.address = await this.getAccount();
      if (this.account.address !== oldAccountAddress)
        this.accountChanged.next(this.account);
    } catch (error) {
      console.log(error);
    }

  }

  async updateAccount() {
    const oldAccountAddress = this.account.address;
    try {
      this.account.address = await this.getAccount();
      this.account.balance = await this.getBalance();
      this.account.privateKey = this.getPrivateKey();
      if (this.account.address !== oldAccountAddress)
        this.accountChanged.next(this.account);
    } catch (error) {
      console.log(error);
    }
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
    const options = {
      from: this.account.address,
      to: addressTo
    }
    return this.embedded
      ? this.erc20.methods.transfer(addressTo, value).send(options)
      : this.transferCoin(addressTo, value);
  }

  async buy(amount: number) {
    const options = {
      to: environment.eth.wallet,
      value: parseInt(this.web3.utils.toWei(amount.toString(), 'ether'))
    }
    return this.embedded
      ? this.web3.eth.sendTransaction(options)
      : this.sendEth(options.to, options.value);
  }

  // ---------------------------------------------------------------------------------------------
  // private functions

  // send eth
  private async sendEth(to: string, value: number = 0, data: string = '0x') {
    const rawTx = {
      nonce: await this.web3.eth.getTransactionCount(this.account.address),
      from: this.account.address,
      to, data, value
    };
    return this.sendTx(rawTx);
  }

  // trasfer erc20 coin
  private async transferCoin(receiver: string, value: number) {
    const query = this.erc20.methods.transfer(receiver, value);
    const encodedABI = query.encodeABI();
    const rawTx = {
      nonce: await this.web3.eth.getTransactionCount(this.account.address),
      data: encodedABI,
      from: this.account.address,
      to: this.erc20.options.address,
      value: 0
    };
    return this.sendTx(rawTx);
  }

  // sign & send tx
  private async sendTx(rawTx: Tx) {
    delete this.lastTx;
    const privateKey = Buffer.from(this.account.privateKey, 'hex');
    const tx = new Tx(rawTx);
    const gasPrice = await this.web3.eth.getGasPrice();

    tx.chainId = environment.eth.networkId;
    tx.gasPrice = gasPrice * 100;
    tx.gasLimit = 60000;
    tx.sign(privateKey);

    // const feeCost = tx.getUpfrontCost() ;
    // console.log(feeCost.toString(), tx);

    const serializedTx = tx.serialize();

    return this.web3.eth
      .sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .once('transactionHash', r => { this.lastTx = r; })
      .on('receipt', console.log);
  }

}
