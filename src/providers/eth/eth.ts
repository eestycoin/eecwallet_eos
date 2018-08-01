import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';

import { default as Web3 } from "web3";


@Injectable()
export class EthProvider {

  web3: Web3;

  contractAddr = '0x5D21c109a3A44466d0C79a8B7b8779d289B5Db8C';
  network = '3';

  account = {
    address: '',
    balance: 0
  }

  ready: Subject<any> = new Subject();

  erc20: any;
  abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ];

  constructor() {
    this.onInit();
  }

  // --------------------------------------------

  async onInit() {

    this.initWeb3();

    const x = await this.getAccount();

    this.connectContract();

    const b = await this.getBalance();

    console.log(x, b, 1);

    // if (!this.isWeb3()) {
    //   // this.initWeb3();
    //   // return;
    // } else {
    //   this.web3 = window['web3'];
    //   console.log(this.web3);
    // }

    // return;

    // if (!(await this.checkNetwork())) {
    //   console.log('checkNetwork failed');
    //   return;
    // }

    //   if (!this.getAccount())
    //     return;

    //   this.connectContract();

    //   this.account.address = this.getAccount();

    //   this.getBalance();

    //   this.ready.next(this.account);

    //   setInterval(() => {
    //     if (this.account.address !== this.getAccount()) {
    //       this.account.address = this.getAccount();
    //       this.ready.next(this.account);
    //     }
    //     this.getBalance();
    //   }, 1000);

    return true;
  }

  // updateAccount() {
  //   this.account.address = this.getAccount();
  //   this.getBalance();
  // }

  // --------------------------------------------

  isWeb3() {
    return true;
  }

  connectContract() {
    this.erc20 = new this.web3.eth.Contract(this.abi, this.contractAddr);
  }

  // --------------------------------------------
  // Async

  initWeb3() {

    if (typeof window['web3'] !== 'undefined') {
      this.web3 = new Web3(window['web3'].currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/fac5373658944a8a860c901f79dfe34d"));
    }

    // const privateKey = 'bd013827c4657f3d27522e266f783d87b545cc5bc4cbb12788f3cee88134c5a9';
    // const account = this.web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    // this.web3.eth.accounts.wallet.add(account);
    // this.web3.eth.defaultAccount = account.address;
  }

  async getAccount() {
    const accounts = await this.web3.eth.getAccounts();

    if (!accounts[0]) {
      console.log('çustom account');
      const privateKey = 'bd013827c4657f3d27522e266f783d87b545cc5bc4cbb12788f3cee88134c5a9';
      const account = this.web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
      this.web3.eth.accounts.wallet.add(account);
      this.web3.eth.defaultAccount = account.address;
    } else {
      this.web3.eth.defaultAccount = accounts[0];
    }

    const x = await this.web3.eth.getAccounts();
    console.log(this.web3.eth.defaultAccount, this.web3.eth);

    this.account.address = this.web3.eth.defaultAccount;

    return this.web3.eth.defaultAccount;
  }

  async getNetwork() {
    // return this.toPromise(this.web3.version.getNetwork);
  }

  async checkNetwork() {
    const currentNetwork = await this.getNetwork();
    // return currentNetwork === this.network;
  }

  async getBalance() {
    return this.erc20.methods.balanceOf(this.web3.eth.defaultAccount).call()
      .then(r => {
        this.account.balance = parseFloat(this.web3.utils.fromWei(r, 'ether'));
        return this.account.balance;
      });
  }

  async tranfer(addressTo: string, tokens: number) {
    console.log(this.erc20);
    const opts = {
      from: this.account.address,
      gas: 100000
    }
    return this.erc20.methods.transfer(addressTo, this.web3.utils.toWei(tokens.toString(), 'ether')).send(opts)
      .then(r => {
        console.log(r);
        return r.blockHash;
      }).catch(e => {
        console.log(e);
      })
    // return this.toPromise(this.erc20.transfer, addressTo, this.web3.toWei(tokens));
  }

  async buy(amount: number) {
    const transactionObject = {
      to: '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123',
      // value: this.web3.toWei(amount)
    }
    return this.toPromise(this.web3.eth.sendTransaction, transactionObject);
  }

  // --------------------------------------------
  // Private utils

  private toPromise(func: Function, ...params) {
    return new Promise((resolve, reject) => {
      func(...params, (err, r) => {
        err ? reject(err) : resolve(r);
      });
    });
  }

}
