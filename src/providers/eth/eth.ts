// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs/Subject';

declare var web3: any;

/*
  Generated class for the EthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.


*/
@Injectable()
export class EthProvider {

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
    if (!this.isWeb3()) {
      return;
    }

    if (!(await this.checkNetwork())) {
      console.log('checkNetwork failed');
      return;
    }

    this.connectContract();

    this.account.address = this.getAccount();
    this.getBalance();

    this.ready.next(this.account);

    setInterval(() => {
      if (this.account.address !== this.getAccount()) {
        this.account.address = this.getAccount();
        this.ready.next(this.account);
      }
      this.getBalance();
    }, 1000);

    return true;
  }

  updateAccount() {
    this.account.address = this.getAccount();
    this.getBalance();
  }

  // --------------------------------------------

  isWeb3() {
    return typeof web3 !== 'undefined';
  }

  getAccount() {
    return web3.eth.accounts[0];
  }

  connectContract() {
    this.erc20 = web3.eth.contract(this.abi).at(this.contractAddr);
  }

  // --------------------------------------------
  // Async

  async getNetwork() {
    return this.toPromise(web3.version.getNetwork);
  }

  async checkNetwork() {
    const currentNetwork = await this.getNetwork();
    return currentNetwork === this.network;
  }

  async getBalance() {
    return this.toPromise(this.erc20.balanceOf, this.getAccount())
      .then(r => {
        this.account.balance = parseFloat(web3.fromWei(r.toString()));
        return this.account.balance;
      });
  }

  async tranfer(addressTo: string, tokens: number) {
    return this.toPromise(this.erc20.transfer, addressTo, web3.toWei(tokens));
  }

  async buy(amount: number) {
    const transactionObject = {
      to: '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123',
      value: web3.toWei(amount)
    }
    return this.toPromise(web3.eth.sendTransaction, transactionObject);
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
