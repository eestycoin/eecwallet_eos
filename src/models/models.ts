export interface User {
  addr: string;
  name: string;
  email: string;
  country: string;
  merchant: boolean;
}

export interface Tx {
  tx: string;
  amount: string;
  date: number;
  from: string;
  to: string;
  error: string;
}

export interface Order {
  
}