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
    accessToken: 'v2x8473d567ae7b4bff3895cdf4dca67a85c53f0aabad726d6061794505d32b16a3',
    apiUrl: 'https://veiko-wallet-proxy.vareger.com/api/v2',
    walletIndex: 0,
    currencyPrefix: 't'
  },
  eth: {
    apiUrl: 'https://veiko-proxy-ropsten.vareger.com/v3/fac5373658944a8a860c901f79dfe34d',
    contractAddr: '0x5D21c109a3A44466d0C79a8B7b8779d289B5Db8C',
    networkId: 3,
    interval: 1000,
    testPrivateKey: 'bd013827c4657f3d27522e266f783d87b545cc5bc4cbb12788f3cee88134c5a9',
    wallet: '0x38bD7BaDAa300D8d40dca0BfbbCab1e0485dD123',
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
    size:  'medium',
    env: 'sandbox', // sandbox | production
    commit: true,   // Show the buyer a 'Pay Now' button in the checkout flow
    client: {
      sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production: '<insert production client id>'
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