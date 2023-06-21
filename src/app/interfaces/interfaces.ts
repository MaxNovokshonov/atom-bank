export interface User {
  login: string;
  password: string;
}

export interface AuthResponse {
  payload: {
    token: string
  } | null;
  error: string
}

export interface AccountsResponse {
  error: string;
  payload: Account[]
}

export interface AccountResponse {
  error: string;
  payload: Account
}

export interface Account {
  account: string,
  balance: number,
  mine: boolean,
  transactions: Transactions[]
}

export interface Transactions {
  amount: number,
  date: Date,
  from: string,
  to: string
}

export interface BalanceDict {
  [key: number]: {
    [key: number]: {
      from: number,
      to: number,
    };
  }
}

export interface Transfer {
  from: string,
  to: string,
  amount: string,
}

export interface CurrencyItem {
  amount: number,
  code: string,
}

export interface CurrencyResponse {
  error: string;
  payload: {
    [key: string]: CurrencyItem
  }
}

export interface WebSocketMessage {
  type: string,
  from: string,
  to: string,
  rate: number,
  change: number
}


