import {Pipe, PipeTransform} from '@angular/core';
import {Account} from "../interfaces/interfaces";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  constructor() {
  }

  transform(accounts: Account[], sortBy = ''): Account[] {
    if (sortBy === 'default') {
      return accounts
    }

    switch (sortBy) {
      case 'account':
        return this.sortByAccount(accounts)
      case 'balance':
        return this.sortByBalance(accounts)
      case 'transaction':
        return this.sortByLastTransaction(accounts)
      default:
        return accounts
    }


  }

  sortByAccount(accounts: Account[]): Account[] {
    return accounts.sort((a, b) => {
      const x = a.account;
      const y = b.account;
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
  }

  sortByBalance(accounts: Account[]): Account[] {
    return accounts.sort((a, b) => {
      const x = a.balance;
      const y = b.balance;
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    });
  }

  sortByLastTransaction(accounts: Account[]): Account[] {
    return accounts.sort((a, b) => {
      const x = a.transactions[0]? a.transactions[0].date : 0;
      const y = b.transactions[0]? b.transactions[0].date : 0;
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    });
  }

}
