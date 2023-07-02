export enum SortType {
  DEFAULT = 'default',
  ACCOUNT = 'account',
  BALANCE = 'balance',
  TRANSACTION = 'lastTransaction',
}

export interface SortOptions {
  title: string;
  value: SortType;
  disabled: boolean;
  sortDirection: 1 | -1;
}
