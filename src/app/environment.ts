export const environment = {
  mode: 'dev',
  ionic: {
    preloadModules: true
  },
  coin: 'EEC',
  membership: {
    packs: [100, 250, 500, 1000, 2500, 5000, 12500, 25000],
    coefficient: 2,
    currencies: ['BTC', 'ETH', 'BCH', 'LTC', 'ZEC']
  },
  bitgo: {
    accessToken: 'v2x7891ce02e09fe1fa638fbf7d11855c94d7052441583c0ef153a299e3e1cae0d2',
    apiUrl: 'https://proxy2bitgo.eestycoin.biz/api/v2',
    walletIndex: 0,
    currencyPrefix: ''
  },
  eos: {
    nodeUrl: 'http://13.125.130.214:8888',
    testkey: '5JZ59m3jxdgbqRfGf4Qgb1wX7qCaU7fNxbwbxuCUXs9Ypmt4EwA',
    interval: 10000,
    contractName: 'eosio.token',
    transactOptions: {
      blocksBehind: 3,
      expireSeconds: 30
    }
  },
  eth: {
    apiUrl: 'https://proxy2infura.eestycoin.biz/v3/fac5373658944a8a860c901f79dfe34d',
    contractAddr: '0x6fd1dada61f2d210a1e4e47b672f73bc851862f9',
    networkId: 1,
    interval: 1000,
    testPrivateKey: '',
    wallet: '0x724F8145B2a28E4935BCF09477eFD51Ce68B2cdD',
  },
  rates: {
    apiUrl: 'https://api.coinmarketcap.com/v2/ticker/',
    interval: 25000,
    defaultQuote: 'USD',
    currencies: {
      BTC: 1,
      LTC: 2,
      BCH: 1831,
      ETH: 1027,
      ZEC: 1437
    },
    coinRateApi: 'https://www.southxchange.com/api/price/EEC/USD'
  },
  firebase: {
    apiKey: 'AIzaSyBIbwROqWi6iwhjavQolloL6wZam1bkFt0',
    authDomain: 'eesty-coin.firebaseapp.com',
    databaseURL: 'https://eesty-coin.firebaseio.com',
    projectId: 'eesty-coin',
    storageBucket: 'eesty-coin.appspot.com',
    messagingSenderId: '871257659837'
  },
  faio: {
    clientId: 'EEC Wallet Fingerprint',
    clientSecret: 'password', //Only necessary for Android
    disableBackup: true,  //Only for Android(optional)
    localizedFallbackTitle: 'Use Pin', //Only for iOS
    localizedReason: 'Please authenticate' //Only for iOS
  },
  paypal: {
    size:  'large',
    env: 'production', // sandbox | production
    commit: true,   // Show the buyer a 'Pay Now' button in the checkout flow
    client: {
      sandbox: 'AZOZskX0LoTOsUI0FcTcXPqaPUYRYkIO2051MdFCcKSfZck0pVAmFH7D4yl2tAYCAZgOgUUlZTNVjEaL',
      production: 'AQ8B5ZguwLfvSnDWzTHkUC6Wr7-gJjRowDCsCMxJeFfLS2FG4AUQtX918qNjGKgrR10QCzBtkZKqPjNe'
    },
    payment: (data, actions) => {},
    onAuthorize: (data, actions) => {}
  }
}

export const erc20abi = [
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