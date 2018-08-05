export interface MetaData {
  timestamp: number;
  num_cryptocurrencies: number;
  error: any;
}

export interface Currency {
  id: number;
  symbol: string;
  last_updated: number;
  quotes: { [id: string]: Quote; };
}

export interface Quote {
  price: number;
}

export interface MarketCap {
  data: { [id: number]: Currency };
  metadata: MetaData;
}